node {
   stage ('checkout'){
       checkout scm
   }
   stage ('install dependences'){
      sh 'npm install'
   }
   
   stage ('build'){
      sh 'npm run build'
   }
}
