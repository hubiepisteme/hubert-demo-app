node {
   stage ('checkout'){
       checkout scm
   }
   stage ('install dependences'){
      sh 'npm install'
   }
   
   stage ('test'){
      sh 'CI=1 npm test'
   }
   stage ('build'){
          sh 'npm run build'
   }

   stage ('zip build result'){
     dir ('build') {
         sh 'ls -la'
     }
     sh 'ls -la'      
     sh 'cd build; zip -r ../build.zip *'
   }
}
