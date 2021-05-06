import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  makeStyles,
  Slider,
  Typography,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles.module.scss';
import React, { useState } from "react";

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

type FishProps = {
  fish: Fish;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardHeader-subheader': {
      fontStyle: 'italic',
      textAlign: 'center',
      backgroundColor: '#1D5080',
      margin: -16,
      paddingBottom: 12,
      paddingTop: 0,
      color: '#FFF',
    },
    '& .MuiCardHeader-title': {
      fontFamily: 'Quicksand',
      textAlign: 'center',
      backgroundColor: '#1D5080',
      margin: -16,
      padding: 12,
      color: '#FFF',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


const useStylesAccordion = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
}));


const MyAccordion = withStyles({
  root: {
    boxShadow: 'none',
    padding: 0,
    '&:last-child)': {
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

const MyAccordionSummary = withStyles({
  root: {
    padding: 0,
    height: 18,
    '&$expanded': {
      minHeight: 32,
    },
  },
  content: {
    '&$expanded': {
      margin: '8px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

const MyAccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 16,
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
}))(AccordionDetails);

const SliderModify = withStyles({
  root: {
    color: '#1B6EBB',
    height: 4,
    marginLeft: '4px',
    width: '260px',
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
    color: '#BBB',
  },
})(Slider);

export default function CardFish({ fish }: FishProps) {
  const [expanded, setExpanded] = useState('');
  const classes = useStyles();
  const classesAccordion = useStylesAccordion();

  const handleChange = (panel: string) => (event, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : 'false');
  };

  { console.log(fish) }

  return (
    <div className={styles.cardContainer}>
      <Card className={classes.root}>
        <CardHeader
          title={fish.nome}
          subheader={fish.genero + " " + fish.especie}
        />
        <CardMedia
          className={classes.media}
          image="/fish.jpg"
          title={fish.nome}
        />
        <CardContent>
          <div className={styles.component}>
            <span className={styles.componentsTitle}>
              Temperatura
            </span>
            <SliderModify
              value={[fish.temperatura.min, fish.temperatura.max]}
              max={30}
              valueLabelDisplay="auto"
            />
          </div>
          <div className={styles.component}>
            <span className={styles.componentsTitle}>
              pH
            </span>
            <SliderModify
              value={[fish.ph.min, fish.ph.max]}
              max={14}
              valueLabelDisplay="auto"
            />
          </div>
          <div className={styles.component}>
            <MyAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <MyAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classesAccordion.heading}>
                  <span className={styles.componentsTitle}>
                    dGH
                  </span>
                </Typography>
              </MyAccordionSummary>
              <MyAccordionDetails>
                <SliderModify
                  value={[fish.dgh.min, fish.dgh.max]}
                  max={25}
                  valueLabelDisplay="auto"
                />
              </MyAccordionDetails>
            </MyAccordion>
            <MyAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <MyAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classesAccordion.heading}>
                  <span className={styles.componentsTitle}>
                    Salinidade
                  </span>
                </Typography>
              </MyAccordionSummary>
              <MyAccordionDetails>
                <SliderModify
                  value={[fish.salinidade.min, fish.salinidade.max]}
                  max={33}
                  valueLabelDisplay="auto"
                />
              </MyAccordionDetails>
            </MyAccordion>
            <MyAccordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <MyAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classesAccordion.heading}>
                  <span className={styles.componentsTitle}>
                    Temperamento
                  </span></Typography>
              </MyAccordionSummary>
              <MyAccordionDetails>
                <span className={styles.componentText}>
                  Sua espécie: {fish.temperamentoEspecie}<br />
                    Outras espécies: {fish.temperamentoOutros}
                </span>
              </MyAccordionDetails>
            </MyAccordion>
            <MyAccordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <MyAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classesAccordion.heading}>
                  <span className={styles.componentsTitle}>
                    Posição no aquário
                  </span>
                </Typography>
              </MyAccordionSummary>
              <MyAccordionDetails>
                <span className={styles.componentText}>
                  {fish.posicaoAquario}
                </span>
              </MyAccordionDetails>
            </MyAccordion>
          </div>
        </CardContent>
      </Card >
    </ div >
  );
}