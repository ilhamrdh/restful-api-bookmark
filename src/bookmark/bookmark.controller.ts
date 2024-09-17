import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EdtiBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmatkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmatkId);
  }

  @Get()
  getBookmark(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmark(userId);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EdtiBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
