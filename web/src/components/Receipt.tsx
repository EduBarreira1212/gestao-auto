import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { LeadType, SellType, VehicleType } from '../types';
import currencyFormatter from '../helpers/currency';

type ReceiptProps = {
    vehicle: VehicleType;
    lead: LeadType;
    sell: SellType;
};

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12, fontFamily: 'Helvetica' },
    section: { marginBottom: 10, padding: 10, borderBottom: '1 solid #000' },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    text: { marginBottom: 3 },
});

const Receipt = ({ vehicle, lead, sell }: ReceiptProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Recibo de Venda</Text>
                    <Text>
                        Data da Venda:{' '}
                        {new Date(sell.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Informações do Veículo</Text>
                    <Text style={styles.text}>Marca: {vehicle.brand}</Text>
                    <Text style={styles.text}>Modelo: {vehicle.name}</Text>
                    <Text style={styles.text}>Ano: {vehicle.year}</Text>
                    <Text style={styles.text}>Placa: {vehicle.plate}</Text>
                    <Text style={styles.text}>KM: {vehicle.km}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Informações do Comprador</Text>
                    <Text style={styles.text}>Nome: {lead.name}</Text>
                    <Text style={styles.text}>Telefone: {lead.phone}</Text>
                    <Text style={styles.text}>Email: {lead.email}</Text>
                    <Text style={styles.text}>
                        Data de nascimento:{' '}
                        {new Date(lead.birthday).toLocaleDateString('pt-BR')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Detalhes da Venda</Text>
                    <Text style={styles.text}>
                        Valor: {currencyFormatter(sell.amount)}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default Receipt;
