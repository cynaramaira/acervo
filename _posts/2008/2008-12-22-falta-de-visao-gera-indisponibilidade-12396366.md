---
id: 12396366
date: "2008-12-22T19:01:16Z"
last_modified_at: null
tags:
  - "falta"
  - "previsao"
categories:
  - "noticias"
title: "Falta de vis\u00e3o gera indisponibilidade"
sutia: null
chapeu: null
autor: null
imagem: null
---
{% raw %}
<p><p>Por Rodrigo Ramos</p></p>
<p><p>Durante este ano de 2008 fiz muitas visitas &agrave; empresas que estavam (algumas continuam) com problemas de indisponibillidade de seus sistemas e consequentemente de suas informa&ccedil;&otilde;es.</p></p>
<p><p>Algumas dessas empresas precisaram gastar muito mais para colocar seus sistemas de volta no ar do que seria necess&aacute;rio investir para diminuir bastante os problemas de indisponibilidade.</p></p>
<p><p>Sempre termino estas visitas sem intender como &eacute; que uma empresa que fatura t&atilde;o bem pode ter este tipo de problema. Eu noto que os gerentes de T.I. at&eacute; tentam vender a id&eacute;ia de alta-disponibilidade, mas os diretores simplesmente n&atilde;o t&ecirc;m a vis&atilde;o necess&aacute;ria para comprar a id&eacute;ia.</p></p>
<p><p>J&aacute; existem solu&ccedil;&otilde;es para tudo o que se pode imaginar quando se fala em alta-diponibilidade. &Eacute; l&oacute;gico que a maioria delas n&atilde;o leva em considera&ccedil;&atilde;o fatores como a queda de um avi&atilde;o sobre o datacenter ou CPD, mas isto deve ser colocado em um mapa de riscos.</p></p>
<p><p>H&aacute; pouco tempo participei de um projeto que teoricamente deveria ser bem simples. A demanda era &ldquo;Inserir dois novos discos em um servidor e criar um RAID-1*&rdquo;. Como esta empresa n&atilde;o possui uma solu&ccedil;&atilde;o de alta-diponibilidade para o seu banco de dados (Oracle) e nossa janela de tempo para trabalhar era m&iacute;nima, tivemos que montra uma verdadeira opera&ccedil;&atilde;o de guerra para impedir que qualquer coisa desse errado e causasse a perda da disponibilidade do banco de dados. Bom, no final deu tudo certo, mas uma opera&ccedil;&atilde;o que deveria levar algumas poucas horas levou quase 02 dias e envolveu nada mais nada menos que 6 profissionais.</p></p>
<p><p>Na minha opini&atilde;o o problema est&aacute; na forma com que as coisas s&atilde;o vistas, s&atilde;o levantadas e apresentadas. Vou relatar um fato que ocorreu com um dos nossos clientes, mas que com toda certeza acontece diariamente em milhares de empresas.</p></p>
<p><p>O cliente estava buscando uma solu&ccedil;&atilde;o para trocar seu sistema de gest&atilde;o da empresa e finalmente achou uma que atendia seus requisitos funcioniais e financeiros. O vendedor da solu&ccedil;&atilde;o fez l&aacute; sua apresenta&ccedil;&atilde;o, disse quanto custava e completou dizendo que o sistema era muito leve e poderia rodar em qualquer m&aacute;quina, com qualquer sistema operacional Linux e que o mundo seria maravilhoso dal&iacute; em diante.</p></p>
<p><p>Bem, ap&oacute;s alguns dias o cliente estava certo que o seu investimento era de apenas R$ 80.000,00**. Ap&oacute;s algum tempo ele ficou sabendo que al&eacute;m dos R$ 80.000,00 para adquirir o sistema ele tamb&eacute;m precisaria:</p></p>
<p><p>- Da subscri&ccedil;&atilde;o do sistema operacional Linux escolhido, <br /></p>
<p>- Da licen&ccedil;a do banco de dados, <br /></p>
<p>- Contratar um DBA**** nem que seja para visitas semanais, quinzenais ou mensais;<br /></p>
<p>- De um bom servidor de marca com um pacote de garantia de suporte com o melhor SLA*** poss&iacute;vel,<br /></p>
<p>- Inserir o sistema operacional Linux dentro de um contrato de suporte tamb&eacute;m com SLA,<br /></p>
<p>- Rever e corrigir qualquer problema em suas instala&ccedil;&otilde;es onde o servidor seria colocado,<br /></p>
<p>- Contratar um profissional capaz de customizar ou gerenciar as customiza&ccedil;&otilde;es necess&aacute;rias no sistema de gest&atilde;o;<br /></p>
<p>- Rever toda a sua infra-estrutura de backup;<br /></p>
<p>- Montar e executar um projeto de alta-disponibilidade para garantir o investimento no sistema de gest&atilde;o.</p></p>
<p><p>Com tudo isto, no final das contas, o cliente descobriu que com R$ 80.000,00 ele completaria apenas a primeira volta de uma corrida com mais de 10 voltas.</p></p>
<p><p>Infelizmente a vis&atilde;o deste cliente impediu que ele montasse o projeto de alta-disponibilidade. A vis&atilde;o da maioria dos empres&aacute;rios e gestores s&oacute; vai at&eacute; os benef&iacute;cios dos sistemas. Eles n&atilde;o enxergam que o sistemas param e quando param o preju&iacute;zo &eacute; garantido.</p></p>
<p><p>*<br /></p>
<p>Resumindo RAID-1....Tudo o que for feito em um disco deve ser feito no outro disco automaticamente. Um arquivo criado no disco 1 &eacute; automaticamente criado no disco 2.</p></p>
<p><p>**<br /></p>
<p>O valores s&atilde;o fict&iacute;cios</p></p>
<p><p>***<br /></p>
<p>SLA (Service Level Agreement). &Eacute; neste acordo com est&aacute; definido o tempo m&aacute;ximo que o fornecedor do hardware tem para substituir alguma pe&ccedil;a com defeito.</p></p>
<p><p>****<br /></p>
<p>DBA (Database Administrator).</p></p>
<p><p>Bom, por hoje &eacute; s&oacute;. Na pr&oacute;xima semana tem mais.<br /></p>
<p>N&atilde;o esquecam de mandar suas d&uacute;vidas e sugest&otilde;es para <a href="mailto:rodrigo.ramos@triforsec.com.br">rodrigo.ramos@triforsec.com.br</a><br /></p>
<p>Tenham todos uma &oacute;tima semana e um feliz Natal.<br /></p>
<p>Rodrigo Ramos, diretor de Opera&ccedil;&otilde;es da TRIFORSEC - Tecnologia em Seguran&ccedil;a da Informa&ccedil;&atilde;o.</p> </p>
{% endraw %}