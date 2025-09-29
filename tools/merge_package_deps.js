// tools/merge_package_deps.js
const fs = require('fs')
const path = require('path')
const pkgPath = path.join(process.cwd(), 'package.json')
const addPath = path.join(process.cwd(), 'package.additions.json')

if (!fs.existsSync(pkgPath)) {
  console.error('package.json não encontrado na raiz.')
  process.exit(1)
}
if (!fs.existsSync(addPath)) {
  console.error('package.additions.json não encontrado.')
  process.exit(1)
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const add = JSON.parse(fs.readFileSync(addPath, 'utf-8'))

pkg.dependencies = pkg.dependencies || {}
Object.entries(add.dependencies || {}).forEach(([name, version]) => {
  if (!pkg.dependencies[name]) {
    pkg.dependencies[name] = version
    console.log(`+ add dependency ${name}@${version}`)
  } else {
    console.log(`= keep dependency ${name}@${pkg.dependencies[name]}`)
  }
})

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
console.log('package.json atualizado com sucesso.')
