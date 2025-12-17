import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import jwt from 'jsonwebtoken';

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const newUser = await userService.createUser(req.body);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Registration failed' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const user = await userService.login(req.body);

      if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );

      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async allUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  },
};
