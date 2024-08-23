function toggleRecipe(id) {
  var recipes = document.getElementsByClassName('recipe')
  for (var i = 0; i < recipes.length; i++) {
    if (recipes[i].id !== id) {
      recipes[i].style.display = 'none'
    }
  }
  var x = document.getElementById(id)
  if (x) {
    x.style.display = x.style.display === 'none' ? 'block' : 'none'
  }
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
