import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

type TPessoaComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (pessoaId: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${pessoaId}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao buscar a pessoa.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao buscar a pessoa.');
  }
};

const create = async (inputPessoa: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', inputPessoa);

    if (data) {
      return data.id;
    }

    return new Error('Error ao criar uma nova pessoa.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar uma nova pessoa.');
  }
};

const updateById = async (pessoaId: number, inputPessoa: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${pessoaId}`, inputPessoa);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar a pessoa.');
  }
};

const deleteById = async (pessoaId: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${pessoaId}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir a pessoa');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
