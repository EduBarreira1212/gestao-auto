import { validate } from 'uuid';

export class UuidValidatorAdapter {
    execute(id) {
        return validate(id);
    }
}
