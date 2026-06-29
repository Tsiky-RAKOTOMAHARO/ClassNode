import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { EtudiantService } from './etudiant.service';

@Controller('etudiants')
export class EtudiantController {
  constructor(private etudiantService: EtudiantService) {}

 
  @Get()
  async getAllEtudiants() {
    return await this.etudiantService.getAllEtudiants();
  }

  
  @Get(':id')
  async getEtudiantById(@Param('id', ParseIntPipe) numEt: number) {
    return await this.etudiantService.getEtudiantById(numEt);
  }

 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEtudiant(
    @Body()
    data: {
      numEt: number;
      nom: string;
      prenom: string;
      note_math?: number;
      note_phys?: number;
    }
  ) {
    return await this.etudiantService.createEtudiant(data);
  }

  @Put(':id')
  async updateEtudiant(
    @Param('id', ParseIntPipe) numEt: number,
    @Body() data: any
  ) {
    return await this.etudiantService.updateEtudiant(numEt, data);
  }

 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEtudiant(@Param('id', ParseIntPipe) numEt: number) {
    return await this.etudiantService.deleteEtudiant(numEt);
  }

  
  @Get('stats/all')
  async getStats() {
    return await this.etudiantService.getStats();
  }
}
