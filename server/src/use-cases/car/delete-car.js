import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../../../aws-S3/aws-s3.js';

export class DeleteCarUseCase {
    constructor(postgresGetCarByIdRepository, postgresDeleteCarRepository) {
        this.postgresGetCarByIdRepository = postgresGetCarByIdRepository;
        this.postgresDeleteCarRepository = postgresDeleteCarRepository;
    }
    async execute(carId) {
        const carExists = await this.postgresGetCarByIdRepository.execute(carId);

        if (!carExists) {
            throw new Error('Car do not exists');
        }

        const deletedCar = await this.postgresDeleteCarRepository.execute(carId);

        if (deletedCar.photoUrls.length > 0) {
            const deletePromises = deletedCar.photoUrls.map(async (file, index) => {
                const extension = file.split('.').pop();

                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `photos/${deletedCar.id}-${index}.${extension}`,
                };

                await s3Client.send(new DeleteObjectCommand(params));
            });

            await Promise.all(deletePromises);
        }

        return deletedCar;
    }
}
