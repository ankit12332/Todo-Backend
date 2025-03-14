import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private taskGateway: TaskGateway // Inject WebSocket Gateway correctly
  ) {}

  async createTask(title: string): Promise<Task> {
    const task = await this.prisma.task.create({ data: { title } });
    const tasks = await this.getTasks(); // Get updated task list
    this.taskGateway.sendTaskUpdate(tasks); // Emit WebSocket event
    return task;
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async deleteTask(id: string): Promise<Task | null> {
    const deletedTask = await this.prisma.task.delete({ where: { id } });
    const tasks = await this.getTasks(); // Get updated task list
    this.taskGateway.sendTaskUpdate(tasks); // Emit WebSocket event
    return deletedTask; // Return the deleted task instead of null
  }
}
