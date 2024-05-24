const { default: publicAddressApi } = require("../../api/publicAddressapi");


const publicAddress = publicAddressApi.injectEndpoints({
    endpoints: (builder) => ({
        division: builder.query({
            query: () => ({
                method: 'GET',
                url: '/divisions',
                headers: {
                    'X-RapidAPI-Key': 'a06b383b78msh4c022480ba91786p113212jsn1b7d2cda5fec',
                    'X-RapidAPI-Host': 'bdapi.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })
        }),
        districtDetails: builder.query({
            query: (name) => ({
                method: 'GET',
                url: `/division/${name}`,
                headers: {
                    'X-RapidAPI-Key': 'a06b383b78msh4c022480ba91786p113212jsn1b7d2cda5fec',
                    'X-RapidAPI-Host': 'bdapi.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })
        })
    })

})

export const { useDivisionQuery, useDistrictDetailsQuery } = publicAddress;