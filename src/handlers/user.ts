import prisma from "../../db";
import { comparePassword, createJwt, hashPasswod } from "../modules/auth";

export const createUser = async (req, res) => {
    const user = await prisma.user.create({
        data:
        {
            username: req.body.username,
            password: await hashPasswod(req.body.password)
        }
    });
    const token = createJwt(user);
    res.json({ token })
}

export const signIn = async (req, res ) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid){
        res.status(401);
        res.json({message: "password not valid"})
        return
    }
    const token = createJwt(user);
    res.json({ token })
}
