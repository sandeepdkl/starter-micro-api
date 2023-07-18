var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write(" Noofvariables=3; \
 variables={'x1', 'x2', 'x3', 's1','s2','s3','sol'}; \
 C=[-1 3 -2]; % cost of objective function \
 Abar=[3 -1 2; -2 4 0; -4 3 8]; % const coeff \
 B=[7; 12; 10]; % RHS of the constrains\
 s=eye(size(Abar,1));\
 A=[Abar s B];\
 Cost=zeros(1,size(A,2));\
 Cost(1:Noofvariables)=C;\
 \
 BV=Noofvariables+1:1:size(A,2)-1;\
 \
 ZjCj=Cost(BV)*A-Cost;\
 \
 ZCj=[ZjCj; A];\
 Simplextable=array2table(ZCj);\
 Simplextable.Properties.VariableNames(1:size(ZCj,2))={'x1', 'x2', 'x3', 's1','s2','s3','sol'}\
 Run=true;\
 while Run\
 if any(ZjCj<0)\
     fprintf('The current BFS is not optimal \n')\
     fprintf('The next iteration req \n')\
     disp('Old Basic variable (BV)= \n')\
     disp(BV)\
     %For finding the entering variable\
     Zc=ZjCj(1:end-1);\
     [EnterCol, pvt_Col]=min(Zc);\
     fprintf('The most negative element in Zj-Cj row is %d corresponding to column %d \n', EnterCol, pvt_Col)\
     fprintf('Entering variable is %d \n', pvt_Col)\
     % For finding the leaving variable\
     sol=A(:,end);\
     Column=A(:,pvt_Col);\
     if all(Column<=0)\
         error('LPP has unbounded solution. Since all entries <= in column %d\n',pvt_Col)\"
     


    
    res.end();
}).listen(process.env.PORT || 3000);
