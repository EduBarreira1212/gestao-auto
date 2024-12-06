export class UpdateLeadUseCase {
    constructor(
        postgresGetLeadByIdRepository,
        postgresGetLeadByEmailRepository,
        postgresGetLeadByPhoneRepository,
        postgresUpdateLeadRepository
    ) {
        this.postgresGetLeadByIdRepository = postgresGetLeadByIdRepository;
        this.postgresGetLeadByEmailRepository = postgresGetLeadByEmailRepository;
        this.postgresGetLeadByPhoneRepository = postgresGetLeadByPhoneRepository;
        this.postgresUpdateLeadRepository = postgresUpdateLeadRepository;
    }
    async execute(leadId, updateLeadParams) {
        const leadWithProvidedIdExists =
            await this.postgresGetLeadByIdRepository.execute(leadId);

        if (!leadWithProvidedIdExists) {
            throw new Error('Lead not found');
        }

        if (updateLeadParams.email) {
            const leadWithProvidedEmailExists =
                await this.postgresGetLeadByEmailRepository.execute(
                    updateLeadParams.email
                );

            if (
                leadWithProvidedEmailExists &&
                leadWithProvidedEmailExists.id !== leadId
            ) {
                throw new Error('E-mail already in use');
            }
        }

        if (updateLeadParams.phone) {
            const leadWithProvidedPhoneExists =
                await this.postgresGetLeadByPhoneRepository.execute(
                    updateLeadParams.phone
                );
            if (
                leadWithProvidedPhoneExists &&
                leadWithProvidedPhoneExists.id !== leadId
            ) {
                throw new Error('Phone number already in use');
            }
        }

        const updatedLead = await this.postgresUpdateLeadRepository.execute(
            leadId,
            updateLeadParams
        );

        return updatedLead;
    }
}
