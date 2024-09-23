import { validate } from 'uuid';

export class IdGeneratorAdapter {
    execute(id) {
        return validate(id);
    }
}
