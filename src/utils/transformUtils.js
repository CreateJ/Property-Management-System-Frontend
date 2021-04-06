export const timeTransToFrontend = (timeStr) =>{
  return timeStr.split('T')[0]
}

export const timeTransToBackend = (timeStr) =>{
  return `${timeStr}T00:00:00Z`
}

export const sexTransToFrontend = val =>{
  if(val === 1){
    return '男'
  }else {
    return '女'
  }
}

export const skillTransToBackend = (skills) => {
  let skills_tmp = skills[0];
  if (skills.length >= 2) {
    for (let i = 1; i < skills.length; i++) {
      skills_tmp += ('|' + skills[i])
    }
  }
  return skills_tmp
}

export const skillTransToFrontend = (skills) => {
  return skills.split('|')
}

