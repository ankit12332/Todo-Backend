import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(title: string): Promise<Task> {
    return this.prisma.task.create({
      data: { title },
    });
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
