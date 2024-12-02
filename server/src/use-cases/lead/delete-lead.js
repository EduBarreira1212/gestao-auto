export class DeleteLeadUseCase {
    constructor(postgresGetLeadByIdRepository, postgresDeleteLeadRepository) {
        this.postgresGetLeadByIdRepository = postgresGetLeadByIdRepository;
        this.postgresDeleteLeadRepository = postgresDeleteLeadRepository;
    }

    async execute(leadId) {
        const lead = await this.postgresGetLeadByIdRepository.execute(leadId);

        if (!lead) {
            throw new Error('Lead not found');
        }

        const deletedLead = await this.postgresDeleteLeadRepository.execute(leadId);

        return deletedLead;
    }
}
