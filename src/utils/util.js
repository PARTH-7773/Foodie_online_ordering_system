import jwt from "jsonwebtoken";

export const GenerateAccessToken = async (_id, role, res) => {
  const Accesstoken = jwt.sign(
    {
      _id: _id,
      role: role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
  );
  return Accesstoken;
};

export const GenerateRefreshToken = async (_id, role, res) => {
  const refreshToken = jwt.sign({
    _id:_id,
    role:role
  },process.env.JWT_SECRET,{expiresIn:'10d'});

  res.cookie("refreshToken", refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge: 60 * 60 * 10 * 24 * 1000
  })
}
