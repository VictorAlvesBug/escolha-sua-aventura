function aleatorio(limiteA = null, limiteB = null){
    if(!limiteA && !limiteB){
        return Math.random();
    }

    if(!limiteB){
        return Math.random() * limiteA;
    }

    return limiteA + Math.random() * (limiteB - limiteA);
}

function aleatorioInteiro(limiteA = null, limiteB = null){
    return parseInt(aleatorio(limiteA, limiteB));
}

function novoGuid(){
    const guidQuatroCaracteres = () => {
        return Math.random().toString(16).substring(11);
    }
    return Array(8).fill().map(_ => guidQuatroCaracteres()).join('');
}

export {
    aleatorio,
    aleatorioInteiro,
    novoGuid
};