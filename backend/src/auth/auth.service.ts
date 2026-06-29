import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private databaseService: DatabaseService) {}

  /**
   * Authentifier un utilisateur
   * @param userName - Nom d'utilisateur
   * @param userPassword - Mot de passe
   * @returns si authentifié
   */
  async login(userName: string, userPassword: string): Promise<any> {
    try {
      
      const users = await this.databaseService.query(
        'SELECT userId, userName FROM USER WHERE userName = ? AND userPassword = ?',
        [userName, userPassword]
      );

      // Si vide
      if (users.length === 0) {
        this.logger.warn(` Tentative login échouée : ${userName}`);
        throw new UnauthorizedException('Identifiants invalides');
      }

      // Utilisateur trouvé
      const user = users[0];
      this.logger.log(`Login réussi : ${userName}`);
      
      return {
        userId: user.userId,
        userName: user.userName,
        message: 'Connexion réussie'
      };
    } catch (error) {
      this.logger.error(`Erreur lors du login: ${error.message}`);
      throw error;
    }
  }
}
