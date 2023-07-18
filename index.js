var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write("\
Noofvariables=3;\n\
variables={'x1', 'x2', 'x3', 's1','s2','s3','sol'};\n\
C=[-1 3 -2]; % cost of objective function\n\
Abar=[3 -1 2; -2 4 0; -4 3 8]; % const coeff\n\
B=[7; 12; 10]; % RHS of the constrains\n\
s=eye(size(Abar,1));\n\
A=[Abar s B];\n\
Cost=zeros(1,size(A,2));\n\
Cost(1:Noofvariables)=C;\n\
\n\
BV=Noofvariables+1:1:size(A,2)-1;\n\
\n\
ZjCj=Cost(BV)*A-Cost;\n\
\n\
ZCj=[ZjCj; A];\n\
Simplextable=array2table(ZCj);\n\
Simplextable.Properties.VariableNames(1:size(ZCj,2))={'x1', 'x2', 'x3', 's1','s2','s3','sol'}\n\
Run=true;\n\
while Run\n\
if any(ZjCj<0)\n\
     fprintf('The current BFS is not optimal \n')\n\
     fprintf('The next iteration req \n')\n\
     disp('Old Basic variable (BV)= \n')\n\
     disp(BV)\n\
     %For finding the entering variable\n\
     Zc=ZjCj(1:end-1);\n\
     [EnterCol, pvt_Col]=min(Zc);\n\
     fprintf('The most negative element in Zj-Cj row is %d corresponding to column %d \n', EnterCol, pvt_Col)\n\
     fprintf('Entering variable is %d \n', pvt_Col)\n\
     % For finding the leaving variable\n\
     sol=A(:,end);\n\
     Column=A(:,pvt_Col);\n\
     if all(Column<=0)\n\
         error('LPP has unbounded solution. Since all entries <= in column %d\n',pvt_Col)\n\
     else\n\
    \n\
         for i=1:size(Column,1)\n\
             if Column(i)>0\n\
                 ratio(i)=sol(i)./Column(i)\n\
             else\n\
                 ratio(i)=inf\n\
             end\n\
         end\n\
     end\n\
 else\n\
     disp('optimal solution of reached')\n\
 end\n\
\n\
[minratio, pvt_Row]=min(ratio)\n\
fprintf('Minimum ratio corresponding to pivot row is %d \n', pvt_Row)\n\
fprintf('Leaving variable is %d \n', BV(pvt_Row))\n\
BV(pvt_Row)=pvt_Col;\n\
disp('New basic variable (BV)==')\n\
disp(BV)\n\
\n\
pvt_Key=A(pvt_Row, pvt_Col);\n\
\n\
A(pvt_Row,:)=A(pvt_Row,:)./pvt_Key;\n\
for i=1:size(A,1)\n\
    if i~=pvt_Row\n\
        A(i,:)=A(i,:)-A(i,pvt_Col).*A(pvt_Row,:);\n\
    end\n\
    ZjCj=ZjCj-ZjCj(pvt_Col).*A(pvt_Row,:);\n\
end\n\
% For printing\n\
ZCj=[ZjCj; A];\n\
Table=array2table(ZCj);\n\
Table.Properties.VariableNames(1:size(ZCj,2))=variables\n\
BFS=zeros(1,size(A,2));\n\
BFS(BV)=A(:,end);\n\
BFS(end)=-sum(BFS.*Cost); % We have to find the minimum optimal value\n\
current_BFS=array2table(BFS);\n\
current_BFS.Properties.VariableNames(1:size(current_BFS,2))=variables\n\
   if any(ZjCj(1:end-1)<0)\n\
       Run=true;\n\
  else\n\
      Run=false;\n\
  end\n\
 end\n\
 fprintf('The current BFS is optimal and value is %d hence optimality is reached \n',BFS(end))");
    
    res.end();
}).listen(process.env.PORT || 3000);
