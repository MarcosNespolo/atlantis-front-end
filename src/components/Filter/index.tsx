import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Chip from '@material-ui/core/Chip';

import React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import styles from './styles.module.scss';
import { FormControl, FormControlLabel, Input, makeStyles, MenuItem, Select, Slider, Switch, TextField, Typography, useTheme, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));


const TextFieldModify = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: '#FFF'
    }
    ,
    '& .MuiInput-underline:before': {
      borderBottomColor: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1B6EBB',
    },
    '& .MuiInput-underline:hover::before': {
      borderBottomColor: '#fff',
    },
  },
})(TextField);

const SliderModify = withStyles({
  root: {
    color: '#1B6EBB',
    height: 4,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#1B6EBB',
    marginTop: -4,
    marginLeft: -6,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 4px)',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
    color: '#FFF',
  },
})(Slider);

const SwitchModify = withStyles({
  switchBase: {
    padding: 2,
    color: '#FFF',
    '&$checked': {
      color: '#1B6EBB',
    },
    '&$checked + $track': {
      backgroundColor: '#FFF',
    },
  },
  checked: {},
  track: {},
})(Switch);

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const posicoes = [
  "Topo",
  "Meio",
  "Fundo"
]

export default function Filter() {
  const [nome, setNome] = useState("");
  const [temperatura, setTemperatura] = useState([0, 30]);
  const [ph, setPh] = useState([0, 14]);
  const [dgh, setDgh] = useState([0, 25]);
  const [salinidade, setSalinidade] = useState([0, 33]);
  const [posicoesAquario, setPosicoesAquario] = useState(posicoes);
  const [amigavelEspecie, setAmigavelEspecie] = useState(true);
  const [amigavelOutros, setAmigavelOutros] = useState(true);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const theme = useTheme();
  const classes = useStyles();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChange = (event) => {
    setPosicoesAquario(event.target.value);
  };

  const toggleCheckedAmigavelEspecie = () => {
    setAmigavelEspecie((prev) => !prev);
  };

  const toggleCheckedAmigavelOutros = () => {
    setAmigavelOutros((prev) => !prev);
  };

  const handleSliderTempChange = (event, value) => {
    setTemperatura(value);
  };

  const handleSliderPhChange = (event, value) => {
    setPh(value);
  };

  const handleSliderDghChange = (event, value) => {
    setDgh(value);
  };

  const handleSliderSalChange = (event, value) => {
    setSalinidade(value);
  };

  return (
    <div className={styles.filterContainer}>
      <header>
        <span>Filtrar</span>
      </header>
      <div className={styles.filterBody}>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            Nome {nome}
          </span>
          <TextFieldModify
            fullWidth
            id="nome"
            value={nome}
            onChange={handleChangeNome}
          />
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            Temperamento
          </span>
          <FormControlLabel
            control={<SwitchModify size="small" checked={amigavelEspecie} onChange={toggleCheckedAmigavelEspecie} />}
            label="Amigável com a própria espécie"
          />
          <FormControlLabel
            control={<SwitchModify size="small" checked={amigavelOutros} onChange={toggleCheckedAmigavelOutros} />}
            label="Amigável com outras espécies"
          />
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            Posição no aquário
            </span>
          <FormControl className={styles.formControl}>
            <Select
              multiple
              value={posicoesAquario}
              onChange={handleChange}
              input={<Input className={styles.multiSelect} />}
              renderValue={(selected: any) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {posicoes.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, posicoesAquario, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            Temperatura <span className={styles.componentsSubtitle}>{temperatura[0]}ºC - {temperatura[1]}ºC</span>
          </span>
          <SliderModify
            value={temperatura}
            onChange={handleSliderTempChange}
            max={30}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            pH <span className={styles.componentsSubtitle}>{ph[0]} - {ph[1]}</span>
          </span>
          <SliderModify
            value={ph}
            onChange={handleSliderPhChange}
            max={14}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            dGH <span className={styles.componentsSubtitle}>{dgh[0]}ºN - {dgh[1]}ºN</span>
          </span>
          <SliderModify
            value={dgh}
            onChange={handleSliderDghChange}
            max={25}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={styles.component}>
          <span className={styles.componentsTitle}>
            Salinidade <span className={styles.componentsSubtitle}>{salinidade[0]}ppt - {salinidade[1]}ppt</span>
          </span>
          <SliderModify
            value={salinidade}
            onChange={handleSliderSalChange}
            max={33}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <footer>
      </footer>
    </div >
  );
}