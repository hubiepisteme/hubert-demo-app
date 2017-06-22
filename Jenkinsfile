node {
   stage ('checkout'){
       checkout scm
   }
   stage ('install dependences'){
      sh 'npm install'
   }
   
   stage ('test'){
      sh 'npm test'
   }
   stage ('build'){
      sh 'npm run build'
   }
}
