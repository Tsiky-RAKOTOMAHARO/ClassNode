import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import { databaseConfig } from '../config/database.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  /**
   * OnModuleInit : s'exécute quand l'app démarre
   * Crée la connexion MySQL
   */
  async onModuleInit() {
    try {
      this.pool = await mysql.createPool(databaseConfig);
      this.logger.log(' Connexion MySQL établie');
    } catch (error) {
      this.logger.error(' Erreur connexion MySQL:', error.message);
      throw error;
    }
  }

  /**
   * OnModuleDestroy : s'exécute quand l'app s'arrête
   * Ferme la connexion proprement
   */
  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log(' Connexion MySQL fermée');
    }
  }

  /**
   * Exécute une requête SQL
   * @param sql - La requête SQL (ex: "SELECT * FROM ETUDIANT WHERE id = ?")
   * @param params - Les paramètres (ex: [1]) pour éviter les injections SQL
   * @returns Les résultats de la requête
   */
  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const [results] = await this.pool.execute(sql, params);
      return results;
    } catch (error) {
      this.logger.error(`Erreur SQL: ${sql}`, error.message);
      throw error;
    }
  }
  
  getPool(): Pool {
    return this.pool;
  }
}
