import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateSetCardDto } from '../dto/create-set-card.dto';

/**
 * Валидатор для проверки CreateSetCardDto
 *
 * Проверяет, что указана либо existingCardId, либо newCard
 */
@ValidatorConstraint({ name: 'CreateSetCardValidator', async: false })
export class CreateSetCardValidator implements ValidatorConstraintInterface {
  validate(value: CreateSetCardDto, _args: ValidationArguments): boolean {
    // Либо existingCardId, либо newCard должен быть указан
    const hasExistingCard = Boolean(
      value.existingCardId && value.existingCardId.trim().length > 0
    );
    const hasNewCard = Boolean(
      value.newCard?.term && value.newCard.term.trim().length > 0
    );

    return hasExistingCard || hasNewCard;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Укажите либо existingCardId для существующей карточки, либо newCard для новой карточки';
  }
}
