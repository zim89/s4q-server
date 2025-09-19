import { PartOfSpeech, VerbType } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateCardDto } from '../../card/dto/create-card.dto';

/**
 * Валидатор для проверки корректности данных неправильных глаголов
 *
 * Проверяет, что для глаголов с типом IRREGULAR указаны обязательные поля:
 * - pastSimple
 * - pastParticiple
 */
@ValidatorConstraint({ name: 'irregularVerbValidator', async: false })
export class IrregularVerbValidator implements ValidatorConstraintInterface {
  validate(value: CreateCardDto): boolean {
    const isVerb = value.partOfSpeech === PartOfSpeech.VERB;
    const isIrregular = value.verbType === VerbType.IRREGULAR;

    // Если это не глагол или не неправильный глагол, валидация проходит
    if (!isVerb || !isIrregular) {
      return true;
    }

    // Для неправильных глаголов обязательны поля pastSimple и pastParticiple
    const hasPastSimple = Boolean(value.pastSimple?.trim().length);
    const hasPastParticiple = Boolean(value.pastParticiple?.trim().length);

    return hasPastSimple && hasPastParticiple;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Для неправильных глаголов (partOfSpeech=VERB, verbType=IRREGULAR) обязательны поля pastSimple и pastParticiple';
  }
}
