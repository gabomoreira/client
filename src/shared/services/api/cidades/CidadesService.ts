import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidades {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

type TCidadeComTotalCount = {
  data: IListagemCidades[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<TCidadeComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (cidadeId: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${cidadeId}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao buscar a cidade.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao buscar a cidade.');
  }
};

const create = async (inputCidade: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', inputCidade);

    if (data) {
      return data.id;
    }

    return new Error('Error ao criar uma nova cidade.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar uma nova cidade.');
  }
};

const updateById = async (cidadeId: number, inputCidade: IDetalheCidade): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${cidadeId}`, inputCidade);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar a cidade.');
  }
};

const deleteById = async (cidadeId: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${cidadeId}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao excluir a cidade');
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
