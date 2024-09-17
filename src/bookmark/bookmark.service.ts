import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookmarkDto, EdtiBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        link: dto.link,
      },
    });
    return bookmark;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark is not found');
    }
    return bookmark;
  }

  async getBookmark(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
      },
    });
    if (bookmarks.length === 0) {
      throw new NotFoundException('Bookmarks is empty');
    }
    return bookmarks;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EdtiBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to recource denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to recource denied');
    }
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
    return { message: 'OK' };
  }
}
