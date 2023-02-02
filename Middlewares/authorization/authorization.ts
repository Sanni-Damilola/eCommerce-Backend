import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface payLoad extends JwtPayload {
  _id: string;
  email: string;
}

const secret = "chgsdhjhjfkkdnkldsnoslsnksbsjvyu";

export const generateToken = (user: payLoad) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1hr" });
};


// verify and authorize the user

export const userAuth = (req: Request, res: Response) => {
    // make request for our token  from headers in HTTP
}