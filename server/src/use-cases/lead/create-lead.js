export class CreateLeadUseCase {
    constructor(
        postgresGetUserByIdRepository,
        postgresGetLeadByEmailRepository,
        postgresGetLeadByPhoneRepository,
        idGeneratorAdapter,
        postgresCreateLeadRepository
    ) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetLeadByEmailRepository = postgresGetLeadByEmailRepository;
        this.postgresGetLeadByPhoneRepository = postgresGetLeadByPhoneRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.postgresCreateLeadRepository = postgresCreateLeadRepository;
    }

    async execute(createLeadParams) {
        const userId = createLeadParams.user_id;

        const userWithProvidedIdExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userWithProvidedIdExists) {
            throw new Error('User with ID not found');
        }

        const leadEmail = createLeadParams.email;

        const leadWithProvidedEmailExists =
            await this.postgresGetLeadByEmailRepository.execute(leadEmail);

        if (leadWithProvidedEmailExists) {
            throw new Error('E-mail already in use by other lead');
        }

        const leadPhone = createLeadParams.phone;

        const leadWithProvidedPhoneExists =
            await this.postgresGetLeadByPhoneRepository.execute(leadPhone);

        if (leadWithProvidedPhoneExists) {
            throw new Error('Phone number already in use by other lead');
        }

        const leadId = await this.idGeneratorAdapter.execute();

        const lead = {
            ...createLeadParams,
            id: leadId,
        };

        const createdLead = await this.postgresCreateLeadRepository.execute(lead);

        return createdLead;
    }
}
