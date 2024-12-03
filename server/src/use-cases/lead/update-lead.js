export class UpdateLeadUseCase {
    constructor(postgresGetLeadByIdRepository, postgresUpdateLeadRepository) {
        this.postgresGetLeadByIdRepository = postgresGetLeadByIdRepository;
        this.postgresUpdateLeadRepository = postgresUpdateLeadRepository;
    }
    async execute(leadId, updateLeadParams) {
        const leadWithProvidedIdExists =
            await this.postgresGetLeadByIdRepository(leadId);

        if (!leadWithProvidedIdExists) {
            throw new Error('Lead not found');
        }

        const updatedLead = await this.postgresUpdateLeadRepository.execute(
            leadId,
            updateLeadParams
        );

        return updatedLead;
    }
}
