export class GetLeadByIdUseCase {
    constructor(postgresGetLeadByIdRepository) {
        this.postgresGetLeadByIdRepository = postgresGetLeadByIdRepository;
    }

    async execute(leadId) {
        const lead = await this.postgresGetLeadByIdRepository.execute(leadId);

        return lead;
    }
}
