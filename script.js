function toggleRecipe(recipeId) {
  const recipe = document.getElementById(recipeId)

  if (recipe.style.display === 'block') {
    recipe.style.display = 'none'

    // Hide the calorie-summary table when the recipe is closed
    document.getElementById('calorie-summary').style.display = 'none'
  } else {
    // Close any other open recipes
    const recipes = document.getElementsByClassName('recipe')
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].style.display = 'none'
    }

    // Open the selected recipe
    recipe.style.display = 'block'

    // Extract the day from the recipe ID
    const day = getDayFromRecipeId(recipeId)

    // Update and show the calorie table for the entire day
    updateCalorieTable(day)
  }
}

function getDayFromRecipeId(recipeId) {
  const dayMap = {
    1: 'sunday',
    1_2: 'sunday',
    2: 'monday',
    2_2: 'monday',
    3: 'tuesday',
    3_2: 'tuesday',
    4: 'wednesday',
    4_2: 'wednesday',
    5: 'thursday',
    5_2: 'thursday',
    6: 'friday',
    6_2: 'friday',
    7: 'saturday',
    7_2: 'saturday',
  }

  // Extract the number from the recipeId (e.g., "breakfast1" -> "1")
  const idNumber = recipeId.match(/\d+(\.\d+)?/)[0] // This will match '1', '1.2', etc.
  console.log('day', dayMap[idNumber])
  return dayMap[idNumber]
}

document.addEventListener('DOMContentLoaded', function () {
  var coll = document.getElementsByClassName('collapsible')
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function () {
      this.classList.toggle('active')
      var content = this.nextElementSibling
      if (content.style.display === 'block') {
        content.style.display = 'none'
      } else {
        content.style.display = 'block'
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  daysOfWeek.forEach((day) => {
    fetch(`${day}-recipe.html`)
      .then((response) => response.text())
      .then((data) => {
        const recipeElement = document.getElementById(`${day}-recipe`)
        if (recipeElement) {
          recipeElement.innerHTML = data
        } else {
          console.error(`Element with ID ${day}-recipe not found`)
        }
      })
      .catch((error) =>
        console.error(`Error loading the recipe for ${day}:`, error)
      )
  })
})

let dailyOrenCalories = 0
let dailyIrisCalories = 0

function updateCalorieTable(day) {
  const dayContainer = document.getElementById(`${day}-recipes`)

  if (!dayContainer) {
    console.error(`Day container for ${day} not found.`)
    return
  }

  // Reset daily totals each time a new recipe is clicked
  let dailyOrenCalories = 0
  let dailyIrisCalories = 0

  // Get all recipe divs for the current day
  const allRecipes = dayContainer.getElementsByClassName('recipe')
  for (let recipe of allRecipes) {
    let orenCaloriesText = ''
    let irisCaloriesText = ''

    const paragraphs = recipe.getElementsByTagName('p')
    for (let p of paragraphs) {
      if (
        p.textContent.includes('לאורן:') &&
        p.textContent.includes('לאיריס:')
      ) {
        const orenSplit = p.textContent.split('לאורן:')
        const irisSplit = orenSplit[1].split('לאיריס:')

        orenCaloriesText = 'לאורן:' + irisSplit[0].trim()
        irisCaloriesText = 'לאיריס:' + irisSplit[1].trim()
      } else if (p.textContent.includes('לאורן:')) {
        orenCaloriesText = p.textContent
      } else if (p.textContent.includes('לאיריס:')) {
        irisCaloriesText = p.textContent
      }
    }

    const orenCaloriesMatch = orenCaloriesText.match(/קלוריות:\s*(\d+)/)
    const irisCaloriesMatch = irisCaloriesText.match(/קלוריות:\s*(\d+)/)

    if (!orenCaloriesMatch || !irisCaloriesMatch) {
      console.error('Calorie information could not be extracted.')
      continue
    }

    const orenCalories = parseInt(orenCaloriesMatch[1], 10)
    const irisCalories = parseInt(irisCaloriesMatch[1], 10)

    dailyOrenCalories += orenCalories
    dailyIrisCalories += irisCalories
  }

  const orenTotalElement = document.getElementById('oren-total')
  const irisTotalElement = document.getElementById('iris-total')

  orenTotalElement.innerText = dailyOrenCalories
  irisTotalElement.innerText = dailyIrisCalories

  document.getElementById('calorie-summary').style.display = 'block'
}

function resetDailyTotals() {
  dailyOrenCalories = 0
  dailyIrisCalories = 0

  const orenTotalElement = document.getElementById('oren-total')
  const irisTotalElement = document.getElementById('iris-total')

  orenTotalElement.innerText = dailyOrenCalories
  irisTotalElement.innerText = dailyIrisCalories

  // Clear the table contents
  const table = document.getElementById('calorie-table')
  table.innerHTML = `
        <tr>
            <th>ארוחה</th>
            <th>קלוריות לאורן</th>
            <th>קלוריות לאיריס</th>
        </tr>
    `
}

function resetDailyTotals() {
  dailyOrenCalories = 0
  dailyIrisCalories = 0

  const orenTotalElement = document.getElementById('oren-total')
  const irisTotalElement = document.getElementById('iris-total')

  orenTotalElement.innerText = dailyOrenCalories
  irisTotalElement.innerText = dailyIrisCalories
}

document.addEventListener('DOMContentLoaded', function () {
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  daysOfWeek.forEach((day) => {
    fetch(`${day}-recipe.html`)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        document.getElementById(`${day}-breakfast`).innerText =
          doc.querySelector(
            `#breakfast${daysOfWeek.indexOf(day) + 1} h2`
          ).innerText
        document.getElementById(`${day}-snack1`).innerText = doc.querySelector(
          `#snack${daysOfWeek.indexOf(day) + 1} h2`
        ).innerText
        document.getElementById(`${day}-lunch`).innerText = doc.querySelector(
          `#lunch${daysOfWeek.indexOf(day) + 1} h2`
        ).innerText
        document.getElementById(`${day}-snack2`).innerText = doc.querySelector(
          `#snack${daysOfWeek.indexOf(day) + 1}_2 h2`
        ).innerText
        document.getElementById(`${day}-dinner`).innerText = doc.querySelector(
          `#dinner${daysOfWeek.indexOf(day) + 1} h2`
        ).innerText
      })
      .catch((error) =>
        console.error(`Error loading the recipe for ${day}:`, error)
      )
  })
})
