import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Create a new item (admin only)
  async create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  // Get all items (admin sees all, customers see only available)
  async findAll(showAll = false) {
    if (showAll) {
      return this.prisma.item.findMany({
        orderBy: { name: 'asc' },
      });
    }
    
    // For customers, only show available items
    return this.prisma.item.findMany({
      where: { 
        available: true,
        quantity: { gt: 0 },
      },
      orderBy: { name: 'asc' },
    });
  }

  // Get a specific item by ID
  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  // Update an item (admin only)
  async update(id: string, updateItemDto: UpdateItemDto) {
    // Check if item exists
    await this.findOne(id);

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  // Delete an item (admin only)
  async remove(id: string) {
    // Check if item exists
    await this.findOne(id);

    return this.prisma.item.delete({
      where: { id },
    });
  }
}