import { api } from "../services/api";
import { GetStaticProps } from 'next';
import styles from './home.module.scss'
import React, { useState } from "react";
import CardFish from "../components/CardFish";
import { useFilter } from '../components/contexts/FilterContext';

type Fish = {
  _id: string,
  nome: string,
  especie: string,
  ordem: string,
  familia: string,
  genero: string,
  localOrigem: string,
  cardumeMinimo: string,
  posicaoAquario: string,
  reproducao: string,
  dimorfismoSexual: string,
  substratos: string[],
  temperamentoEspecie: string,
  temperamentoOutros: string,
  dieta: string,
  racao: string[],
  quantidadeAlimentacao: number,
  tamanhoMedio: number,
  larguraMinima: number,
  alturaMinima: number,
  volumePrimeiro: number,
  volumeAdicional: number,
  temperatura: { min: number, max: number },
  ph: { min: number, max: number },
  dgh: { min: number, max: number },
  salinidade: { min: number, max: number },
  observacao: string,
}

type Fishes = {
  fishes: Fish[];
}

export default function ListFishes(fishes: Fishes) {
  const {
    filterName,
    filterTemp,
    filterPh,
    filterDgh,
    filterSal,
    filterPositions,
    filterIsFriendlyOthers,
    filterIsFriendly,
  } = useFilter();

  return (
    <div className={styles.homepage}>
      <section className={styles.peixesContainer}>
        Amigavel: {filterIsFriendly.toString()}<br />
        Outros: {filterIsFriendlyOthers.toString()}
        <ul>
          {fishes.fishes.map((fish: Fish) => {
            if (
              fish.temperatura.max <= filterTemp[1] &&
              fish.temperatura.min >= filterTemp[0] &&
              fish.ph.max <= filterPh[1] &&
              fish.ph.min >= filterPh[0] &&
              fish.dgh.max <= filterDgh[1] &&
              fish.dgh.min >= filterDgh[0] &&
              fish.salinidade.max <= filterSal[1] &&
              fish.salinidade.min >= filterSal[0]
            ) {
              if ((
                filterIsFriendly && fish.temperamentoEspecie == 'amigavel' ||
                !filterIsFriendly
              ) && (
                  filterIsFriendlyOthers && fish.temperamentoOutros == 'amigavel' ||
                  !filterIsFriendlyOthers
                )) {
                return (
                  <li key={fish._id}>
                    <CardFish fish={fish} />
                  </li>
                )
              }
            }
          })}
        </ul>
      </section>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('peixes')

  const fishes = data.map(peixe => {
    return {
      _id: peixe._id,
      nome: peixe.nome,
      especie: peixe.especie,
      ordem: peixe.ordem,
      familia: peixe.familia,
      genero: peixe.genero,
      localOrigem: peixe.localOrigem,
      cardumeMinimo: peixe.cardumeMinimo,
      posicaoAquario: peixe.posicaoAquario,
      reproducao: peixe.reproducao,
      dimorfismoSexual: peixe.dimorfismoSexual,
      substratos: peixe.substratos,
      temperamentoEspecie: peixe.temperamentoEspecie,
      temperamentoOutros: peixe.temperamentoOutros,
      dieta: peixe.dieta,
      racao: peixe.racao,
      quantidadeAlimentacao: peixe.quantidadeAlimentacao,
      tamanhoMedio: peixe.tamanhoMedio,
      larguraMinima: peixe.larguraMinima,
      alturaMinima: peixe.alturaMinima,
      volumePrimeiro: peixe.volumePrimeiro,
      volumeAdicional: peixe.volumeAdicional,
      temperatura: peixe.temperatura,
      ph: peixe.ph,
      dgh: peixe.dgh,
      salinidade: peixe.salinidade,
      observacao: peixe.observacao,
    }
  })

  return {
    props: {
      fishes
    },
    revalidate: 60 * 60 * 8,
  }
}