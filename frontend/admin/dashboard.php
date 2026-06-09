<?php
include 'auth.php';
include '../db.php';

// --- Fetch Stats Data ---
$total_orders = $conn->query("SELECT COUNT(id) as total FROM orders")->fetch_assoc()['total'];
$total_revenue = $conn->query("SELECT SUM(total_amount) as total FROM orders")->fetch_assoc()['total'];
$total_users = $conn->query("SELECT COUNT(id) as total FROM users WHERE role = 'user'")->fetch_assoc()['total'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Simple internal style for the table to ensure it looks good immediately */
        .recent-orders-container {
            margin-top: 30px;
            background: var(--bg-color, #fff);
            /* Uses variable if dark mode is active */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .recent-orders-container h3 {
            margin-bottom: 15px;
            color: var(--text-color, #333);
        }

        .orders-table {
            width: 100%;
            border-collapse: collapse;
        }

        .orders-table th,
        .orders-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        .orders-table th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
        }

        /* Dark mode overrides for table */
        body.dark-mode .orders-table th {
            background-color: #333;
            color: #fff;
            border-bottom: 1px solid #555;
        }

        body.dark-mode .orders-table td {
            border-bottom: 1px solid #555;
            color: #eee;
        }
    </style>
</head>

<body class="admin-body">

    <aside class="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul>
            <li><a href="dashboard.php" class="active"><i class="fas fa-tachometer-alt"></i> <span>Dashboard</span></a></li>
            <li><a href="manage_users.php"><i class="fas fa-users"></i> <span>Manage Users</span></a></li>
            <li><a href="manage_orders.php"><i class="fas fa-box"></i> <span>Manage Orders</span></a></li>
            <li><a href="manage_products.php"><i class="fas fa-utensils"></i> <span>Manage Products</span></a></li>
            <!-- <li><a href="messages.php"><i class="fas fa-envelope"></i> <span>Messages</span></a></li> -->
            <li><a href="../index.php" target="_blank"><i class="fas fa-globe"></i> <span>View Site</span></a></li>
            <li><a href="logout.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a></li>
        </ul>
    </aside>

    <main class="admin-main-content">

        <div class="dashboard-header">
            <div>
                <h2>Dashboard</h2>
                <p style="color: gray; font-size: 0.9rem;">Welcome, <?php echo htmlspecialchars($_SESSION['admin_name']); ?>!</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button id="admin-theme-toggle" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">
                </button>
            </div>
        </div>

        <div class="stat-cards">
            <div class="stat-card">
                <h3>Total Revenue</h3>
                <p>₹<?php echo number_format($total_revenue ?? 0, 2); ?></p>
            </div>
            <div class="stat-card">
                <h3>Total Orders</h3>
                <p><?php echo $total_orders ?? 0; ?></p>
            </div>
            <div class="stat-card">
                <h3>Total Customers</h3>
                <p><?php echo $total_users ?? 0; ?></p>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <canvas id="ordersChart"></canvas>
            </div>
            <div class="chart-card">
                <canvas id="categoryChart"></canvas>
            </div>
        </div>

        <div class="recent-orders-container">
            <h3>Recent Orders (Last 5)</h3>
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Amount</th>
                        <!-- <th>Status</th> -->
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Fetch the last 5 orders. 
                    // IMPORTANT: Make sure your column name for date is 'created_at' or change it below to 'order_date'
                    $recent_sql = "SELECT * FROM orders ORDER BY id DESC LIMIT 5";
                    $recent_result = $conn->query($recent_sql);

                    if ($recent_result && $recent_result->num_rows > 0) {
                        while ($row = $recent_result->fetch_assoc()) {
                            // Handle date column name safely
                            $date_val = isset($row['created_at']) ? $row['created_at'] : (isset($row['order_date']) ? $row['order_date'] : 'N/A');

                            echo "<tr>";
                            echo "<td>#" . $row['id'] . "</td>";
                            echo "<td>₹" . number_format($row['total_amount'], 2) . "</td>";
                            // Change 'status' to 'order_status' (or whatever your database uses)
                            // echo "<td>" . ucfirst($row['order_status']) . "</td>";
                            echo "<td>" . $date_val . "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='4'>No orders found.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>

    </main>

    <script>
        // --- 1. DARK MODE LOGIC ---
        const toggleBtn = document.getElementById('admin-theme-toggle');
        const body = document.body;

        // Check LocalStorage on load
        if (localStorage.getItem('admin-theme') === 'dark') {
            body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('admin-theme', 'dark');
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('admin-theme', 'light');
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // --- 2. CHARTS LOGIC ---
        // Ensure get_stats.php exists and returns valid JSON
        fetch('get_stats.php')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // Orders Chart
                new Chart(document.getElementById('ordersChart'), {
                    type: 'line',
                    data: {
                        labels: data.dates,
                        datasets: [{
                            label: 'Orders (Last 7 Days)',
                            data: data.order_counts,
                            borderColor: '#f2bd12',
                            backgroundColor: 'rgba(242, 189, 18, 0.1)',
                            fill: true,
                            tension: 0.4
                        }]
                    }
                });

                // Category Chart
                new Chart(document.getElementById('categoryChart'), {
                    type: 'doughnut',
                    data: {
                        labels: data.categories,
                        datasets: [{
                            data: data.cat_counts,
                            backgroundColor: ['#f2bd12', '#212121', '#ff6384', '#36a2eb', '#4bc0c0']
                        }]
                    }
                });
            })
            .catch(error => console.error('Error fetching stats:', error));
    </script>
</body>

</html>