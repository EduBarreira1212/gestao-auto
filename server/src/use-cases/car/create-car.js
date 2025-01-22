import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../../../aws-S3/aws-s3.js';

export class CreateCarUseCase {
    constructor(
        postgresGetUserByIdRepository,
        postgresCreateCarRepository,
        idGeneratorAdapter
    ) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresCreateCarRepository = postgresCreateCarRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }
    async execute(createCarParams) {
        const userId = createCarParams.user_id;

        const isIdValid = await this.postgresGetUserByIdRepository.execute(userId);

        if (!isIdValid) {
            throw new Error('User ID invalid');
        }

        const carId = this.idGeneratorAdapter.execute();

        const { photos, ...paramsWithoutPhotos } = createCarParams;

        const car = {
            ...paramsWithoutPhotos,
            id: carId,
            photoUrls: [],
        };

        if (photos) {
            const uploadPromises = photos.map(async (file, index) => {
                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    ACL: 'public-read',
                    Key: `photos/${carId}-${index}.${file.mimetype.split('/')[1]}`,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                });

                await s3Client.send(command);

                const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/photos/${carId}-${index}.${file.mimetype.split('/')[1]}`;

                car.photoUrls.push(fileUrl);
            });

            await Promise.all(uploadPromises);
        }

        const carCreated = await this.postgresCreateCarRepository.execute(car);

        return carCreated;
    }
}
