import { isValid } from 'date-fns'

function validateParams(params) {
  const validation = { errorMessage: '', isValid: true }

  if (!params) {
    return { errorMessage: 'Recommendation params must be provided.', isValid: false }
  }

  if (!params.birthDate || !isValid(new Date(params.birthDate))) {
    validation.errorMessage = `A valid birth date must be provided. `
    validation.isValid = false
  }

  if (!!params.birthDate && new Date(params.birthDate) > new Date()) {
    validation.errorMessage = `${validation.errorMessage}Birth date can not be after this day. `
    validation.isValid = false
  }

  if (!params.sex || (params.sex?.toLowerCase() !== 'male' && params.sex?.toLowerCase() !== 'female')) {
    validation.errorMessage = `${validation.errorMessage}A valid sex (male, female) must be provided. `
    validation.isValid = false
  }

  if (!params.height || isNaN(params.height)) {
    validation.errorMessage = `${validation.errorMessage}Height must be a number. `
    validation.isValid = false
  }

  if (!params.weight || isNaN(params.weight)) {
    validation.errorMessage = `${validation.errorMessage}Weight must be a number. `
    validation.isValid = false
  }

  if (!params.targetWeight || isNaN(params.targetWeight)) {
    validation.errorMessage = `${validation.errorMessage}Target weight must be a number. `
    validation.isValid = false
  }

  if (
    !params.goal ||
    (params.goal.toLowerCase() !== 'lose' &&
      params.goal.toLowerCase() !== 'maintain' &&
      params.goal.toLowerCase() !== 'gain')
  ) {
    validation.errorMessage = `${validation.errorMessage}A valid goal (lose, maintain, gain) must be provided. `
    validation.isValid = false
  }

  if (!!params.goal && !!params.targetWeight && !!params.weight) {
    if (params.goal === 'gain' && params.weight >= params.targetWeight) {
      validation.errorMessage = `${validation.errorMessage}Target weight must be higher than current weight if you goal is to gain weight. `
      validation.isValid = false
    }
    if (params.goal === 'lose' && params.weight < params.targetWeight) {
      validation.errorMessage = `${validation.errorMessage}Target weight must be less than current weight if you goal is to lose weight.`
      validation.isValid = false
    }
  }

  if (
    !params.activityLevel ||
    (params.activityLevel.toLowerCase() !== 'very light' &&
      params.activityLevel.toLowerCase() !== 'light' &&
      params.activityLevel.toLowerCase() !== 'active' &&
      params.activityLevel.toLowerCase() !== 'very active')
  ) {
    validation.errorMessage = `${validation.errorMessage}A valid physical activity level (very light, light, active, very active) must be provided. `
    validation.isValid = false
  }

  return validation
}

module.exports = { validateParams }

// type NewPlanParams = {
//   birthDate: string | null
//   sex: Sex | null
//   country: string
//   height: string
//   weight: string
//   goal: Goal | null
//   activityLevel: ActivityLevel | null
//   targetWeight: string
//   pastFailureReason: string
// }
