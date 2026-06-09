<?php
include '../db.php';
header('Content-Type: application/json');

// 1. Orders per day
// SELECT DATE(order_date) as date, COUNT(*) as count FROM orders GROUP BY DATE(order_date) LIMIT 7
$orders_sql = 'SELECT DATE(order_date) as date, COUNT(*) as count 
                FROM orders 
                WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
                GROUP BY DATE(order_date) 
                ORDER BY date ASC';
$orders_res = $conn->query($orders_sql);
$dates = [];
$counts = [];
while ($r = $orders_res->fetch_assoc()) {
    $dates[] = $r['date'];
    $counts[] = $r['count'];
}

// 2. Products per Category
$cat_sql = "SELECT category, COUNT(*) as count FROM products GROUP BY category";
$cat_res = $conn->query($cat_sql);
$cats = [];
$cat_counts = [];
while ($r = $cat_res->fetch_assoc()) {
    $cats[] = $r['category'];
    $cat_counts[] = $r['count'];
}

echo json_encode(['dates' => $dates, 'order_counts' => $counts, 'categories' => $cats, 'cat_counts' => $cat_counts]);
