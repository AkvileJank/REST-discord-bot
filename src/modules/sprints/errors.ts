import NotFound from '@/utils/errors/NotFound';

export class SprintNotFound extends NotFound {
  constructor(message = 'Sprint was not found') {
    super(message);
  }
}