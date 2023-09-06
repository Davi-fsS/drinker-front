import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import DrinkCard from "../components/DrinkCard/DrinkCard";
import "./style.css";

const Flow = () => {

    const getAllByIdMock = [
        {
            id: 1,
            name: "Fanta + Coca",
            price: 20.0,
            imgUrl: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2013/11/30/cocacoaacucar.jpg",
            description: "Uma bebida muito saborosa, lembra dos odores da Malásia, algo tropical.",
            doseA: "Fanta",
            qtdA: 2,
            doseB: "Coca",
            qtdB: 2
        },
        {
            id: 2,
            name: "Guaraná + Fanta",
            price: 20.0,
            imgUrl: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2013/11/30/cocacoaacucar.jpg",
            description: "Uma bebida muito saborosa, lembra dos odores da Jamaica, algo tropical.",
            doseA: "Guaraná",
            qtdA: 2,
            doseB: "Fanta",
            qtdB: 2
        },
        {
            id: 3,
            name: "Coca",
            price: 10.0,
            imgUrl: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2013/11/30/cocacoaacucar.jpg",
            description: "Uma bebida muito saborosa, lembra dos odores da Sibéria, algo tropical.",
            doseA: "Coca",
            qtdA: 2,
            doseB: "Coca",
            qtdB: 2
        }
    ]

    const [drinks, setDrinks] = useState([]);
    const [drinkDetail, setDrinkDetail] = useState(null);

    const [isCardRead, setIsCardRead] = useState(false);
    const [isSystemStarted, setIsSystemStarted] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const [qtdDoseA, setQtdDoseA] = useState(null);
    const [qtdDoseB, setQtdDoseB] = useState(null);

    useEffect(() => {

        setTimeout(() => {
            setIsCardRead(true);
        }, 4000);

    }, []);

    const initializingSystem = () => {
        setIsSystemStarted(true);
        setDrinks(getAllByIdMock)
    };

    const handleOpenDetail = (id) => {
        const getDetailById = getAllByIdMock.filter(value => value.id === id);
        setIsOpenDetail(true);
        setDrinkDetail(getDetailById);
        setQtdDoseA(getDetailById[0].qtdA);
        setQtdDoseB(getDetailById[0].qtdB);
    };

    const handleDosesMinus = (dose) => {
        if (dose === 'A') {
            setQtdDoseA(qtdDoseA - 1);
        }
        else {
            setQtdDoseB(qtdDoseB - 1);
        }
    };

    const handleDosesMore = (dose) => {
        if (dose === 'A') {
            setQtdDoseA(qtdDoseA + 1);
        }
        else {
            setQtdDoseB(qtdDoseB + 1);
        }
    };

    const backToDrinksPage = () => {
        setIsOpenDetail(false);
        setDrinkDetail(null);
    };

    return <div className="position">
        {
            !isCardRead ?
                <Card>
                    <h2>Bem vindo ao Drinker</h2>
                    <i>Aproxime o seu cartão</i>
                </Card>
                :
                !isSystemStarted ?
                    <Card>
                        <h2>Bem vindo ao Drinker</h2>
                        <i>Gabriel</i>
                        <Button onClick={initializingSystem}>
                            Vamos começar?
                        </Button>
                    </Card>
                    :
                    !isOpenDetail ?
                        drinks.map((value) => {
                            return <DrinkCard src={value.imgUrl} onClick={() => handleOpenDetail(value.id)}>
                                <p>{value.name}</p>
                                <p>R$ {value.price}</p>
                            </DrinkCard>
                        })
                        :
                        drinkDetail.map((value) => {
                            return <Card>
                                <h2>{value.name}</h2>
                                <i>{value.description}</i>
                                <p>R$ {value.price}</p>
                                <div>
                                    <p>Escolha a proporção de doses na sua bebida</p>
                                    <div className="dose-content">
                                        <div className="dose-field">
                                            <button onClick={() => handleDosesMinus('A')}>-</button>
                                            <input type="number" value={qtdDoseA} />
                                            <button onClick={() => handleDosesMore('A')}>+</button>
                                        </div>
                                        <p>{value.doseA}</p>
                                    </div>

                                    <div className="dose-content">
                                        <div className="dose-field">
                                            <button onClick={() => handleDosesMinus('B')}>-</button>
                                            <input type="number" value={qtdDoseB} />
                                            <button onClick={() => handleDosesMore('B')}>+</button>
                                        </div>
                                        <p>{value.doseB}</p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button color="white" onClick={backToDrinksPage}>Voltar</Button>
                                    <Button onClick={() => alert('fazer bebida')}>Pedir</Button>
                                </div>
                            </Card>
                        })

        }

    </div>
};

export default Flow;
