"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadisticasService = void 0;
const sequelize_1 = require("../db/sequelize");
const lider_service_1 = require("./lider.service");
const sequelize_2 = require("sequelize");
const liderService = new lider_service_1.LiderService();
class EstadisticasService {
    // obtener todos los datos para la pagina de estadisticas
    async getData(documento_ad) {
        const lideres = await liderService.getByAdmin(documento_ad, { acepts: true });
        const listDocumentsLiders = lideres.map(lider => lider.documento_li);
        // console.log(listDocumentsLiders)
        const personas = await sequelize_1.models.Persona.findAndCountAll({
            where: {
                estado: 1,
                documento_li: {
                    [sequelize_2.Op.or]: [...listDocumentsLiders]
                }
            }
        });
        const listIdsBarriosToPersons = personas.rows.map(person => person.id_bar);
        // const intervalosEdades = await sequelize.query<QueryEdadesGeneroVotantes[]>("SELECT TIMESTAMPDIFF(YEAR, fecha_naci, CURDATE()) AS edad, genero, COUNT(*) AS cantidad_votantes FROM persona GROUP BY edad, genero ORDER BY edad ASC",{
        //     type:QueryTypes.SELECT
        // });
        // console.log(intervalosEdades)
        const barrios = await sequelize_1.models.Barrio.findAndCountAll({
            where: {
                id_bar: {
                    [sequelize_2.Op.or]: [...listIdsBarriosToPersons]
                }
            }
        });
        const votantesByLider = this.countPersonsToLider(lideres, personas.rows);
        const votantesAgesByGenre = this.contarPersonasPorEdad(personas.rows);
        const votantesByComuna = this.contarPersonasComuna(barrios.rows, personas.rows);
        const votantesByBarrio = this.contarVotantesPorBarrio(barrios.rows, personas.rows);
        const countLiders = lideres.length;
        const countVotantes = personas.count;
        const countComunas = votantesByComuna.length;
        const countBarrios = votantesByBarrio.length;
        const dataCharts = {
            votantesByLider,
            votantesAgesByGenre,
            votantesByComuna,
            votantesByBarrio,
        };
        const counts = {
            countBarrios,
            countComunas,
            countLiders,
            countVotantes,
        };
        return {
            counts,
            dataCharts
        };
    }
    // metodos para organizar datos para las graficas
    //contar personas por cada lider
    countPersonsToLider(lideres, personas) {
        const lideresConPersonas = lideres.map((lider) => ({
            ...lider,
            personas: personas.filter((persona) => persona.documento_li === lider.documento_li),
        }));
        const resultado = [];
        for (const lider of lideresConPersonas) {
            if (!lider.personas || lider.personas.length === 0) {
                // resultado.push([lider.documento_li, 0]);
                continue;
            }
            resultado.push([lider.nombre, lider.personas.length]);
        }
        return resultado;
    }
    ;
    // cuenta personas de cada genero por intervalos de 5 años de edad
    contarPersonasPorEdad(personas) {
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const edades = personas.map((persona) => {
            const fechaNacimiento = new Date(persona.fecha_naci);
            const anioNacimiento = fechaNacimiento.getFullYear();
            const edad = anioActual - anioNacimiento;
            return { edad, genero: persona.genero };
        });
        const hombres = edades.filter((persona) => persona.genero === "Masculino");
        const mujeres = edades.filter((persona) => persona.genero === "Femenino");
        const contadorHombres = hombres.reduce((contador, persona) => {
            const edad = persona.edad;
            const rangoMinimo = Math.floor((edad - 18) / 5) * 5 + 18;
            const rangoMaximo = rangoMinimo + 4;
            const rango = `${rangoMinimo}-${rangoMaximo}`;
            contador[rango] = (contador[rango] || 0) + 1;
            return contador;
        }, {});
        const contadorMujeres = mujeres.reduce((contador, persona) => {
            const edad = persona.edad;
            const rangoMinimo = Math.floor((edad - 18) / 5) * 5 + 18;
            const rangoMaximo = rangoMinimo + 4;
            const rango = `${rangoMinimo}-${rangoMaximo}`;
            contador[rango] = (contador[rango] || 0) + 1;
            return contador;
        }, {});
        return {
            hombres: this.ordenarPorRango(Object.entries(contadorHombres)),
            mujeres: this.ordenarPorRango(Object.entries(contadorMujeres)),
        };
    }
    //ordena  por el intervalo de edades
    ordenarPorRango(array) {
        const edades = Array.from({ length: 20 }, (_, i) => i * 5 + 18);
        const contador = Object.fromEntries(array);
        edades.forEach((edad) => {
            const rangoMinimo = Math.floor((edad - 18) / 5) * 5 + 18;
            const rangoMaximo = rangoMinimo + 4;
            const rango = `${rangoMinimo}-${rangoMaximo}`;
            if (!(rango in contador)) {
                contador[rango] = 0;
            }
        });
        return Object.entries(contador)
            .sort((a, b) => {
            const aRango = parseInt(a[0].split("-")[0]);
            const bRango = parseInt(b[0].split("-")[0]);
            return aRango - bRango;
        });
    }
    // cuenta votantes por cada barrio
    contarVotantesPorBarrio(barrios, personas) {
        const personasPorBarrio = {};
        for (const persona of personas) {
            const idBarrio = persona.id_bar;
            if (personasPorBarrio[idBarrio]) {
                personasPorBarrio[idBarrio].push(persona);
            }
            else {
                personasPorBarrio[idBarrio] = [persona];
            }
        }
        const resultados = [];
        for (const barrio of barrios) {
            const idBarrio = barrio.id_bar;
            const nombreBarrio = barrio.nombre;
            const personasEnBarrio = personasPorBarrio[idBarrio] || [];
            const nVotantesEnBarrio = personasEnBarrio.filter((p) => p.estado === "1").length;
            resultados.push([nombreBarrio, nVotantesEnBarrio]);
        }
        return resultados;
    }
    //contar personas por comunas
    contarPersonasComuna(barrios, personas) {
        const cuentas = {};
        barrios.forEach((barrio) => {
            const comuna = `comuna ${barrio.comuna}`;
            if (!cuentas[comuna]) {
                cuentas[comuna] = 0;
            }
            personas.forEach((persona) => {
                if (persona.id_bar === barrio.id_bar) {
                    cuentas[comuna]++;
                }
            });
        });
        const resultado = Object.entries(cuentas).map(([comuna, npersonas]) => [
            comuna,
            npersonas,
        ]);
        return resultado;
    }
}
exports.EstadisticasService = EstadisticasService;
