import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EtudiantService {
  private readonly logger = new Logger(EtudiantService.name);

  constructor(private databaseService: DatabaseService) {}

 
  async getAllEtudiants(): Promise<any[]> {
    try {
      const etudiants = await this.databaseService.query(
        'SELECT * FROM ETUDIANT'
      );
      this.logger.log(` ${etudiants.length} étudiants récupérés`);
      return etudiants;
    } catch (error) {
      this.logger.error('Erreur lors de la récupération des étudiants', error);
      throw error;
    }
  }

  
  async getEtudiantById(numEt: number): Promise<any> {
    try {
      const etudiants = await this.databaseService.query(
        'SELECT * FROM ETUDIANT WHERE numEt = ?',
        [numEt]
      );

      if (etudiants.length === 0) {
        throw new NotFoundException(`Étudiant ${numEt} non trouvé`);
      }

      return etudiants[0];
    } catch (error) {
      this.logger.error(`Erreur lors de la récupération de l'étudiant ${numEt}`, error);
      throw error;
    }
  }

  
  async createEtudiant(data: {
    numEt: number;
    nom: string;
    prenom: string;
    note_math?: number;
    note_phys?: number;
  }): Promise<any> {
    try {
      // Vérification si existe
      const existing = await this.databaseService.query(
        'SELECT numEt FROM ETUDIANT WHERE numEt = ?',
        [data.numEt]
      );

      if (existing.length > 0) {
        throw new BadRequestException(`L'étudiant ${data.numEt} existe déjà`);
      }

      
      await this.databaseService.query(
        'INSERT INTO ETUDIANT (numEt, nom, prenom, note_math, note_phys) VALUES (?, ?, ?, ?, ?)',
        [data.numEt, data.nom, data.prenom, data.note_math || 0, data.note_phys || 0]
      );

      this.logger.log(` Étudiant ${data.numEt} créé`);
      return { message: 'Étudiant créé', numEt: data.numEt };
    } catch (error) {
      this.logger.error('Erreur lors de la création de l\'étudiant', error);
      throw error;
    }
  }

  
  async updateEtudiant(
    numEt: number,
    data: {
      nom?: string;
      prenom?: string;
      note_math?: number;
      note_phys?: number;
    }
  ): Promise<any> {
    try {
      const existing = await this.getEtudiantById(numEt);

      // Construire la requête UPDATE dynamiquement
      const updates: string[] = [];
      const values: any[] = [];

      if (data.nom !== undefined) {
        updates.push('nom = ?');
        values.push(data.nom);
      }
      if (data.prenom !== undefined) {
        updates.push('prenom = ?');
        values.push(data.prenom);
      }
      if (data.note_math !== undefined) {
        updates.push('note_math = ?');
        values.push(data.note_math);
      }
      if (data.note_phys !== undefined) {
        updates.push('note_phys = ?');
        values.push(data.note_phys);
      }

      if (updates.length === 0) {
        throw new BadRequestException('Aucun champ à modifier');
      }

      values.push(numEt);

      const sql = `UPDATE ETUDIANT SET ${updates.join(', ')} WHERE numEt = ?`;
      await this.databaseService.query(sql, values);

      this.logger.log(` Étudiant ${numEt} modifié`);
      return { message: 'Étudiant modifié', numEt };
    } catch (error) {
      this.logger.error(`Erreur lors de la modification de l'étudiant ${numEt}`, error);
      throw error;
    }
  }

  
  async deleteEtudiant(numEt: number): Promise<any> {
    try {

      await this.getEtudiantById(numEt);

      // Supprimer
      await this.databaseService.query(
        'DELETE FROM ETUDIANT WHERE numEt = ?',
        [numEt]
      );

      this.logger.log(`Étudiant ${numEt} supprimé`);
      return { message: 'Étudiant supprimé', numEt };
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression de l'étudiant ${numEt}`, error);
      throw error;
    }
  }

  
  async getStats(): Promise<any> {
    try {
      const stats = await this.databaseService.query(`
        SELECT 
          COUNT(*) as total_etudiants,
          AVG(note_math) as moyenne_math,
          AVG(note_phys) as moyenne_phys,
          MAX(note_math) as max_math,
          MAX(note_phys) as max_phys,
          MIN(note_math) as min_math,
          MIN(note_phys) as min_phys
        FROM ETUDIANT
      `);

      return stats[0];
    } catch (error) {
      this.logger.error('Erreur lors du calcul des stats', error);
      throw error;
    }
  }
}
