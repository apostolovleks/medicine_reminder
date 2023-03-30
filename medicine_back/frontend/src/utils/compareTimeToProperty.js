import { enqueueSnackbar } from "notistack";

/**
 * Checks the input to show information when periodicity time is now
 * @param input 
 */
const compareTimeToProperty = (input) => {
    const currTime = Date.parse(new Date());
    
    const filteredInput = input.filter(item => Date.parse(item.periodicity_date_time) > currTime - 4000 && Date.parse(item.periodicity_date_time) <= currTime + 4000)

    filteredInput.forEach((item) => enqueueSnackbar(item.pill_name, { variant: "info" }))
}

export default compareTimeToProperty
