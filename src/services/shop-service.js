export default class ShopService {

    data = [
        {
            id: 0,
            itemName: 'Mercedes S550 4matic',
            price: 118000,
            dateOfChange: '31.10.18',
            file: undefined,
            description: '',
            properties: {
                property_1: {
                    property_1_Name: 'Цвет авто',
                    property_1_Value_1: 'Синий',
                    property_1_Value_2: 'Черный',
                },
                property_2: {
                    property_2_Name: 'Год выпуска',
                    property_2_Value_1: 2017,
                },
                property_3: {
                    property_1_Name: 'Тип топлива',
                    property_2_Value_1: 'Бензин',
                }
            },
        },
        {
            id: 1,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18',
            file: undefined,
            description: '',
            properties: {
                property_1: {
                    property_1_Name: 'Цвет авто',
                    property_1_Value_1: 'Синий',
                    property_1_Value_2: 'Черный',
                },
                property_2: {
                    property_2_Name: 'Год выпуска',
                    property_2_Value_1: 2017,
                },
                property_3: {
                    property_1_Name: 'Тип топлива',
                    property_2_Value_1: 'Бензин',
                }
            },
        },
        {
            id: 2,
            itemName: 'DURUN DURUN HOUSE',
            price: 1216000,
            dateOfChange: '01.11.18',
            file: undefined,
            properties: {
                property_1: {
                    property_1_Name: 'Цвет авто',
                    property_1_Value_1: 'Синий',
                    property_1_Value_2: 'Черный',
                },
                property_2: {
                    property_2_Name: 'Год выпуска',
                    property_2_Value_1: 2017,
                },
                property_3: {
                    property_1_Name: 'Тип топлива',
                    property_2_Value_1: 'Бензин',
                }
            },
        },
    ];

    getItems() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Some Error'))
                }
                resolve(this.data)
            }, 800)
        });
    }
}