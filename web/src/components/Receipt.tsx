import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { LeadType, SellType, VehicleType } from '../types';
import currencyFormatter from '../helpers/currency';

type ReceiptProps = {
    storeName: string;
    vehicle: VehicleType;
    lead: LeadType;
    sell: SellType;
};

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1 solid #000',
    },
    daysAndKm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    signatureContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    title: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 12,
        padding: 4,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: { marginBottom: 3 },
});

const Receipt = ({ storeName, vehicle, lead, sell }: ReceiptProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{storeName}</Text>
                    <Text>CNPJ: </Text>
                    <Text>
                        Data de emissão:{' '}
                        {new Date(sell.createdAt).toLocaleDateString('pt-BR', {
                            timeZone: 'UTC',
                        })}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Cliente</Text>
                    <Text>Nome: {lead.name}</Text>
                    <Text>CPF/CNPJ: </Text>
                    <Text>E-mail: {lead.email}</Text>
                    <Text>Telefone: {lead.phone}</Text>
                    <Text>
                        Data de nascimento:{' '}
                        {new Date(lead.birthday).toLocaleDateString('pt-BR', {
                            timeZone: 'UTC',
                        })}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Veículo Vendido</Text>
                    <Text>
                        Modelo: {vehicle.name} - Marca: {vehicle.brand}
                    </Text>
                    <Text>Renavam: </Text>
                    <Text>
                        Chassi: - Ano: {vehicle.year} - Placa: {vehicle.plate}
                    </Text>
                    <Text>Combustível: </Text>
                    <Text>Valor de Venda: {currencyFormatter(sell.amount)}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Acerto Financeiro</Text>
                    <Text>Valor Total: R$ {currencyFormatter(sell.amount)}</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        TERMOS DE RESP. CIVIL, CRIMINAL E MULTAS DE TRÂNSITO
                    </Text>
                    <Text>
                        Declaro estar ciente de minha responsabilidade quanto ao
                        veiculo ora negociado, no que tange a questão civil, criminal
                        e eventuais multas de trânsito, débitos referentes a IPVA,
                        alienação e qualquer outro efeito legal que incida sobre o
                        veículo, referente ao periodo a partir dessa data até a data
                        da efetiva transferência junto ao Departamento de Trânsito e
                        por conseqüência me comprometo a quitar os mesmos,
                        autorizando inclusive a transferência imediata da pontuação
                        para o meu prontuário C.N.H. e para tanto deixo cópia da
                        minha Carteira de Habilitação.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>
                        RECIBO DE ENTREGA DE VEÍCULO (ENTREGA DO VEÍCULO AO CLIENTE)
                    </Text>
                    <Text>
                        Declaro para os devidos fins, que recebo neste ato o veículo
                        descrito nessa negociação, bem como as suas chaves e
                        documentos, no estado em que se encontra. Declaro ainda ter
                        vistoriado o veículo descrito nessa negociação, estando o
                        mesmo em perfeito estado de funcionamento, inclusive portando
                        todos os acessórios obrigatórios: macaco, chaves de roda,
                        estepe, triângulo e extintor de incêndio.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>CERTIFICADO DE GARANTIA</Text>
                    <View style={styles.daysAndKm}>
                        <Text>Quant. de dias de garantia: 90</Text>
                        <Text>Km total de garantia: 5.000</Text>
                    </View>
                    <Text>
                        Tem o presente certificado a finalidade de formalizar as
                        condições de garantia do veículo descrito e identificado
                        neste documento, no que se refere única e exclusivamente às
                        peças internas do MOTOR e do CÂMBIO, a partir desta data,
                        determinamos o prazo descrito acima ou a quilometragem
                        descrita acima, prevalecendo o que ocorrer primeiro. O
                        presente certificado somente estabelece normas dentro do
                        prazo da garantia legal, nos moldes do artigo 26 do Código de
                        Defesa do Consumidor lei nº 8.078/1990. Isto não é uma
                        garantia contratual adicional. Do motor assegura: a bomba de
                        óleo, árvore de manivelas e polia, bielas e mancais, pistões
                        anéis e pinos de postões, camisas de cilindros, cabeçotes,
                        válvulas, balancins, varetas, tuchos, eixo comando de
                        válvulas e engrenagens de comando, correntes de comando,
                        correia dentada e tensionadores, volante de motor e
                        cremalheira, juntas de motor (quando envolvidas em reparos).
                        Do câmbio assegura: Todos os componentes internos, exceto
                        conjunto de embreagem. Está excluído desta garantia qualquer
                        defeito mecânico onde as peças componentes tenham sido
                        indevidamente consertadas por oficina não autorizada pela
                        REVENDA. Defeito mecânico que tenha surgido direta ou
                        indiretamente pela contribuição de, ou estragos causados por
                        atos da natureza, a saber: enchentes, geadas, etc., ou por
                        qualquer tipo de acidente, uso impróprio, negligência, falha
                        de manutenção ou tomada de medidas preventivas, ato ou
                        omissão. Esta garantia perderá efeito caso o veículo seja
                        vendido ou transferido a terceiros sem anuência da REVENDA.
                        Todo e qualquer defeito sob garantia que o produto venha
                        apresentar dentro dos prazos estabelecidos acima, deverá ser
                        comunicado por escrito de forma inequívoca à REVENDA, no
                        máximo em 24 (vinte e quatro) horas após ter sido detectado.
                        A presente garantia se restringe as peças do motor e caixa de
                        câmbio, não cobrindo quaisquer outros danos, mesmo quando
                        decorrentes de avaria ou defeitos do veiculo. Não serão
                        cobertas despesas tais como: Despesas com transporte;
                        Imobilização do veículo; Hospedagem; Socorro ou Guincho. Não
                        se enquadram em garantia de serviços, tais como: lavagens,
                        reapertos, regulagens, balanceamento e alinhamento de rodas.
                        Não faz parte da garantia, e correrão, portanto, por conta
                        exclusive do cliente, os itens a seguir relacionados,
                        normalmente denominados de manutenção , os quais se acham
                        igualmente desprotegidos até mesmo nas vendas de veículos
                        novos: Aditivo do líquido do radiador e fluidos; Anel de
                        vedação do bujão de escoamento do óleo do motor; Contrapinos;
                        Elementos filtrantes/filtros; Lubrificantes/óleos; Travas
                        para filtro de combustível; Velas de ignição e cabos de vela;
                        Serviços relacionados aos sub-ítens anteriores, e ainda os de
                        reaperto e regulagem de motor; Parte elétrica em geral;
                        Suspensão do veiculo (amortecedor, buchas, molas, junta
                        homocinética).
                    </Text>
                </View>
                <View style={styles.signatureContainer}>
                    <View style={styles.signature}>
                        <Text>__________________________________</Text>
                        <Text>{storeName}</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>__________________________________</Text>
                        <Text>Comprador</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default Receipt;
