import { isWithinInterval } from 'date-fns';
import { IUser } from "../interfaces/user/user.interface";

interface IFilterOptions {
    name: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    status: boolean | undefined;
}


const filterUsersList = (filterOptions: IFilterOptions, usersList: IUser[]): IUser[] => {
    let filteredList: IUser[] = [];

    filteredList = filterUsersListByName(filterOptions.name, usersList);

    filteredList = filterUsersListByStatus(filterOptions.status, filteredList);

    filteredList = filterUsersListByDate(filterOptions.startDate, filterOptions.endDate, filteredList);

    return filteredList;
}

const filterUsersListByName = (name: string, usersList: IUser[]): IUser[] => {
    const NAME_NOT_TYPPED = name === undefined;

    // Se o nome não foi digitado, retorna a lista original;
    if (NAME_NOT_TYPPED) {
    return usersList;
    }

    // Se o nome foi digitado, 
    // Vou percorrer a lista de usuários
    // e acesso a propriedade "nome" de cada objeto "usuário"
    // verifico em cada objeto a propriedade "usuário.nome", possui(include) o nome digitado
    // se verdadeiro, retorna o usuário na lista final retornada
    // se falso, exclui o usuário da lista final retornada
    const filteredList = usersList.filter(user => user.nome.toLowerCase().includes(name.toLowerCase()));

    // retorna a lista final filtrada;
    return filteredList;
}

const filterUsersListByStatus = (status: boolean | undefined, usersList: IUser[]): IUser[] => {
    const STATUS_NOT_SELECTED = status === undefined;

    // Se o status não foi selecionado, retorna a lista original;
    if (STATUS_NOT_SELECTED) {
    return usersList;
    }

    // Se o status foi selecionado, 
    // Vou percorrer a lista de usuários
    // e acesso a propriedade "ativo" de cada objeto "usuário"
    // verifico em cada objeto a propriedade "usuário.ativo", possui(include) o status selecionado
    // se verdadeiro, retorna o usuário na lista final retornada
    // se falso, exclui o usuário da lista final retornada
    const filteredList = usersList.filter(user => user.ativo === status);

    // retorna a lista final filtrada;
    return filteredList;
}

const filterUsersListByDate = (startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] => {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    // Se as datas nao foram selecionadas, retorna a lista original;
    if (DATES_NOT_SELECTED) {
    return usersList;
    }

    // Se as datas foram selecionadas,
    // Vou percorrer a lista de usuários
    // e acesso a propriedade "dataCadastro" de cada objeto "usuário"
    // verifico em cada objeto a propriedade "usuário.dataCadastro", esta no intervalo de datas selecionadas
    // se verdadeiro, retorna o usuário na lista final retornada
    // se falso, exclui o usuário da lista final retornada
    const filteredList = usersList.filter(user => isWithinInterval(new Date(user.dataCadastro), {
    start: startDate,
    end: endDate
    }));

    // retorna a lista final filtrada;
    return filteredList;
}


// mesmo nome do arquivo
export { filterUsersList }