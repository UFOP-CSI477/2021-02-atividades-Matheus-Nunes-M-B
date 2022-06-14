import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/utils/base.service';
import { Repository } from 'typeorm';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { Sheet } from './entities/sheet.entity';

@Injectable()
export class SheetService extends BaseService<
  Sheet,
  CreateSheetDto,
  UpdateSheetDto
> {
  constructor(
    @InjectRepository(Sheet)
    private readonly sheetRepository: Repository<Sheet>,
  ) {
    super(sheetRepository);
  }
}
