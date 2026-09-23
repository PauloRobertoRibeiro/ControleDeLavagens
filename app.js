const KEY = "controle-lavagens-v1";
const INSTALL_HIDE = "controle-lavagens-install-hide";
const SIZES = [
  { id: "citadino" },
  { id: "berlina" },
  { id: "suv" },
  { id: "van" },
  { id: "moto" },
];
const STATUS = {
  pedido: { chip: "wait" },
  confirmado: { chip: "busy" },
  curso: { chip: "busy" },
  feito: { chip: "done" },
  cancelado: { chip: "stop" },
  falta: { chip: "stop" },
};
const I18N = {
  es: {
    "tab.hoje": "Hoy",
    "tab.agenda": "Agenda",
    "tab.clientes": "Clientes",
    "tab.lembretes": "Avisos",
    "tab.mais": "Más",
    "title.hoje": "Hoy",
    "title.agenda": "Agenda",
    "title.clientes": "Clientes",
    "title.lembretes": "Avisos",
    "title.mais": "Más",
    "title.precos": "Precios",
    "title.caixa": "Caja",
    "title.equipa": "Equipo",
    "title.oficina": "Taller",
    "title.cliente": "Cliente",
    "title.job": "Cita",
    "boot": "Abriendo…",
    "welcome.h": "Control de Lavados",
    "welcome.p": "Agenda del lavado: clientes, vehículos, precios, citas y aviso de la última limpieza. Todo queda en este móvil.",
    "welcome.empty": "Empezar con mi taller",
    "welcome.demo": "Ver un día de ejemplo",
    "hoje.washes": "lavados de hoy",
    "hoje.paid": "cobrado hoy",
    "hoje.remind": "para avisar",
    "hoje.due": "por cobrar",
    "hoje.queue": "Atendimientos de hoy",
    "hoje.receive": "A recibir",
    "hoje.pendingN": "{n} pagos pendientes",
    "hoje.empty": "Nada citado para hoy.",
    "book": "Citar",
    "fab": "+ Cita",
    "agenda.free": "Libre este día.",
    "cal": "D L M X J V S",
    "clients.search": "Nombre, teléfono o matrícula",
    "clients.new": "Nuevo cliente",
    "clients.none": "Aún no hay clientes.",
    "clients.nophone": "sin teléfono",
    "clients.vehicles": "vehículo(s)",
    "client.missing": "Cliente no encontrado.",
    "client.nophone": "Sin teléfono",
    "client.book": "Citar lavado",
    "client.edit": "Editar",
    "client.vehicles": "Vehículos",
    "client.addv": "+ vehículo",
    "client.last": "última",
    "client.never": "nunca",
    "client.nov": "Sin vehículos. Añada la matrícula.",
    "client.hist": "Historial",
    "client.nohist": "Aún sin lavados.",
    "rem.help": "Aviso cuando pasan {days} días del último lavado (Más → Taller).",
    "rem.over": "Ya pasó el plazo",
    "rem.week": "Esta semana",
    "rem.empty": "Nada en esta lista.",
    "rem.last": "última",
    "rem.days": "días",
    "rem.never": "nunca lavó aquí",
    "rem.next": "sugerido",
    "rem.long": "mucho tiempo",
    "rem.norecord": "sin registro",
    "price.h": "Tabla de precios",
    "price.add": "+ servicio",
    "price.svc": "Servicio",
    "price.note": "El total usa el tipo de vehículo (utilitario, SUV, furgoneta…).",
    "cash.month": "Mes",
    "cash.in": "Cobrado",
    "cash.out": "por cobrar",
    "cash.receive": "A recibir",
    "cash.pendingN": "{n} pagos pendientes",
    "cash.pending": "A recibir",
    "cash.nopend": "Nada pendiente este mes.",
    "cash.got": "Cobrado",
    "cash.nogot": "Sin cobros este mes.",
    "cash.period": "Periodo",
    "cash.mes": "Mes",
    "cash.t1": "1.er trim.",
    "cash.t2": "2.º trim.",
    "cash.t3": "3.er trim.",
    "cash.t4": "4.º trim.",
    "cash.year": "Año",
    "cash.bal": "Balancete",
    "cash.washes": "Lavados",
    "cash.openN": "Aún abiertos",
    "cash.doneN": "Terminados",
    "cash.cancelN": "Cancelados",
    "cash.faltaN": "No vino",
    "cash.billed": "Facturado",
    "cash.best": "Mejor mes del año",
    "cash.bestLine": "{month} · {money} · {n} {word}",
    "cash.wash1": "lavado",
    "cash.washN": "lavados",
    "cash.bestNone": "Aún no hay movimiento este año.",
    "cash.bySvc": "Por servicio",
    "cash.bySize": "Por tipo de vehículo",
    "cash.byPay": "Por forma de pago",
    "cash.yearTable": "Comparativa del año {year}",
    "cash.quarters": "Trimestres",
    "cash.colMonth": "Mes",
    "cash.colN": "Lavados",
    "cash.colDone": "Terminados",
    "cash.colGot": "Cobrado",
    "cash.colPend": "A recibir",
    "cash.colBill": "Facturado",
    "cash.total": "Total",
    "cash.print": "Imprimir",
    "cash.qty": "Cantidad",
    "more.price": "Precios",
    "more.price2": "Tabla por tipo de vehículo",
    "more.cash": "Caja",
    "more.cash2": "Balancete mensual, trimestral y anual",
    "more.team": "Equipo",
    "more.team2": "Quién lava (no es acceso de empleados)",
    "more.shop": "Taller",
    "more.shop2": "Nombre, WhatsApp, horario, días de aviso",
    "more.bak": "Copia de seguridad",
    "more.bak2": "Exportar y restaurar. Sin esto se pierde el taller.",
    "more.foot": "Los datos viven en este móvil. Exporte una copia cada día y guárdela.",
    "inst.h": "Instalar la app",
    "inst.p": "Póngala en la pantalla de inicio. Se abre a pantalla completa, como una aplicación, sin el navegador.",
    "inst.go": "Instalar",
    "inst.how": "Cómo instalar",
    "inst.later": "Ahora no",
    "inst.ok": "App instalada",
    "inst.ok2": "Ábrala desde el icono Lavados en la pantalla de inicio.",
    "inst.more": "Instalar en este móvil",
    "inst.more2": "Pantalla completa, como una aplicación",
    "inst.android": "En Chrome, toque los tres puntos ⋮ arriba a la derecha. Luego Instalar aplicación o Añadir a pantalla de inicio. Abra el icono Lavados.",
    "inst.ios": "En Safari, toque el botón Compartir y luego Añadir a pantalla de inicio. Abra el icono Lavados.",
    "inst.desk": "En el ordenador, use el icono de instalar en la barra de direcciones, o el menú del navegador: Instalar Control de Lavados.",
    "team.note": "Esto es la lista de quién lava, no cuentas de acceso. Para que otro empleado vea el mismo taller: Más → Copia de seguridad → Exportar, y en el otro móvil Restaurar.",
    "team.h": "Equipo",
    "team.add": "+ persona",
    "team.on": "Activo",
    "team.off": "Inactivo",
    "shop.name": "Nombre del taller",
    "shop.wa": "WhatsApp / teléfono",
    "shop.prefix": "Prefijo del país",
    "shop.addr": "Dirección",
    "shop.open": "Abre",
    "shop.close": "Cierra",
    "shop.days": "Avisar tras (días)",
    "shop.cur": "Moneda",
    "shop.lang": "Idioma",
    "shop.lang.es": "España (español)",
    "shop.lang.pt": "Portugal (portugués)",
    "shop.lang.pt-BR": "Brasil (portugués)",
    "shop.save": "Guardar",
    "setup.h": "Prepare su lavadero",
    "setup.p": "Nombre real, quién lava, sus precios. Quite el día de ejemplo si aún está.",
    "setup.name": "Nombre del lavadero",
    "setup.staff": "Quién lava",
    "setup.price": "Revisar precios",
    "setup.demo": "Quitar el día de ejemplo",
    "setup.demo2": "Se borran María, João y Ana. Lo que usted creó se queda.",
    "setup.todo": "Pendiente",
    "setup.done": "Hecho",
    "setup.go": "Abrir",
    "setup.clear": "Quitar ejemplo",
    "setup.confirm": "Se quitan los clientes de ejemplo y sus citas. Lo que usted creó se queda. ¿Seguir?",
    "setup.priceOk": "Estos precios están bien",
    "setup.priceDone": "Precios guardados para su taller.",
    "job.missing": "Cita no encontrada.",
    "job.paid": "Pagado",
    "job.unpaid": "Aún no pagado",
    "job.start": "Iniciar",
    "job.done": "Concluir",
    "job.pay": "Recibir",
    "job.edit": "Editar",
    "job.reschedule": "Reprogramar",
    "job.warn": "Avisar cita",
    "job.cancel": "Cancelar",
    "job.ready": "Ya puede recogerlo",
    "job.readyDone": "Aviso de recogida enviado",
    "form.editjob": "Editar cita",
    "form.newjob": "Nueva cita",
    "form.client": "Cliente",
    "form.vehicle": "Vehículo",
    "form.day": "Día",
    "form.time": "Hora",
    "form.who": "Responsable",
    "form.duration": "Duración (min)",
    "form.conflict": "Choque de horario con {who} a las {time}.",
    "form.noconflict": "Horario libre para este responsable.",
    "form.state": "Estado del lavado",
    "form.disc": "Descuento",
    "form.notes": "Notas",
    "form.save": "Guardar",
    "form.close": "Cerrar",
    "form.editc": "Editar cliente",
    "form.newc": "Nuevo cliente",
    "form.name": "Nombre",
    "form.nameHint": "Escriba el nombre. Si el cliente ya existe, elíjalo en la lista.",
    "form.phone": "Teléfono / WhatsApp",
    "form.mail": "Correo",
    "form.delc": "Borrar cliente",
    "form.editv": "Editar vehículo",
    "form.newv": "Nuevo vehículo",
    "form.plate": "Matrícula",
    "form.brand": "Marca",
    "form.model": "Modelo",
    "form.color": "Color",
    "form.type": "Tipo",
    "form.delv": "Borrar vehículo",
    "st.pedido": "Pedido",
    "st.confirmado": "Confirmado",
    "st.curso": "En curso",
    "st.feito": "Terminado",
    "st.cancelado": "Cancelado",
    "st.falta": "No vino",
    "size.citadino": "Utilitario",
    "size.berlina": "Berlina",
    "size.suv": "SUV",
    "size.van": "Furgoneta",
    "size.moto": "Moto",
    "pay.list": "Efectivo,Transferencia,Tarjeta,Bizum,MB Way,Pendiente",
    "pay.cash": "Efectivo",
    "pay.pend": "Pendiente",
    "pay.done": "Pagado con {method}",
    "alert.name": "Ponga el nombre.",
    "alert.delc": "¿Borrar este cliente y los vehículos?",
    "alert.delv": "¿Borrar este vehículo?",
    "alert.noclient": "Falta el cliente.",
    "alert.noveh": "Falta el vehículo.",
    "alert.nosvc": "Elija al menos un servicio.",
    "alert.conflict": "Hay otro servicio a la misma hora. ¿Guardar igual?",
    "alert.pay": "¿Cómo pagó?",
    "alert.staff": "Nombre",
    "alert.bak": "No se pudo restaurar: ",
    "bak.h": "Copia de seguridad",
    "bak.p": "Guarde el archivo fuera de este móvil: Drive, WhatsApp (envíeselo a usted mismo) o USB. Restaurar lo recupera. Sin esto, si el teléfono se pierde, se pierde el taller.",
    "bak.out": "Guardar archivo",
    "bak.in": "Restaurar",
    "bak.share": "Enviar (WhatsApp, Drive…)",
    "bak.shareText": "Copia de Control de Lavados. Guárdela fuera de este móvil.",
    "bak.never": "Aún no hay copia",
    "bak.last": "Última copia: {when}",
    "bak.today": "hoy",
    "bak.days": "hace {n} días",
    "bak.warn": "Sin copia reciente. Si este móvil se pierde, se pierde el taller.",
    "bak.do": "Hacer copia",
    "bak.later": "Hoy no",
    "bak.ok": "Copia lista. Guarde el archivo fuera de este móvil.",
    "bak.confirm": "Esto sustituye todos los datos de este móvil. ¿Continuar?",
    "svc.new": "Nuevo servicio",
    "staff.1": "Operario 1",
    "wa.hello": "Hola {name}, le escribe {shop}.",
    "wa.book": "Hola {name}, el lavado de su {vehicle} quedó citado el {date} a las {time}. {shop}",
    "wa.remind": "Hola {name}, el último lavado de su {vehicle} fue hace {when} ({last}). ¿Quiere citar el siguiente? {shop}",
    "wa.ready": "Hola {name}, el lavado de su {vehicle} ya ha terminado. Puede pasar a recogerlo. {shop}",
    "euro": "Euro",
    "real": "Real",
  },
  pt: {},
  "pt-BR": {},
};
I18N.pt = Object.assign({}, I18N.es, {
  "tab.hoje": "Hoje",
  "tab.agenda": "Agenda",
  "tab.clientes": "Clientes",
  "tab.lembretes": "Avisos",
  "tab.mais": "Mais",
  "title.hoje": "Hoje",
  "title.agenda": "Agenda",
  "title.clientes": "Clientes",
  "title.lembretes": "Avisos",
  "title.mais": "Mais",
  "title.precos": "Preços",
  "title.caixa": "Caixa",
  "title.equipa": "Equipa",
  "title.oficina": "Oficina",
  "title.cliente": "Cliente",
  "title.job": "Marcação",
  "boot": "A abrir…",
  "welcome.h": "Controle de Lavagens",
  "welcome.p": "Agenda da lavação: clientes, veículos, preços, marcações e aviso da última limpeza. Tudo fica neste telemóvel.",
  "welcome.empty": "Começar com a minha oficina",
  "welcome.demo": "Ver um dia de exemplo",
  "hoje.washes": "lavagens de hoje",
  "hoje.paid": "recebido hoje",
  "hoje.remind": "para lembrar",
  "hoje.due": "por cobrar",
  "hoje.queue": "Atendimentos de hoje",
  "hoje.receive": "A receber",
  "hoje.pendingN": "{n} pagamentos pendentes",
  "hoje.empty": "Nada marcado para hoje.",
  "book": "Marcar",
  "fab": "+ Marcar",
  "agenda.free": "Livre neste dia.",
  "cal": "D S T Q Q S S",
  "clients.search": "Nome, telefone ou matrícula",
  "clients.new": "Novo cliente",
  "clients.none": "Ainda não há clientes.",
  "clients.nophone": "sem telefone",
  "clients.vehicles": "veículo(s)",
  "client.missing": "Cliente não encontrado.",
  "client.nophone": "Sem telefone",
  "client.book": "Marcar lavagem",
  "client.edit": "Editar",
  "client.addv": "+ veículo",
  "client.last": "última",
  "client.never": "nunca",
  "client.nov": "Sem veículos. Adicione a matrícula.",
  "client.hist": "Histórico",
  "client.nohist": "Ainda sem lavagens.",
  "rem.help": "Aviso quando passam {days} dias da última lavagem (Mais → Oficina).",
  "rem.over": "Já passou o prazo",
  "rem.week": "Esta semana",
  "rem.empty": "Nada nesta lista.",
  "rem.last": "última",
  "rem.days": "dias",
  "rem.never": "nunca lavou aqui",
  "rem.next": "sugerido",
  "rem.long": "muito tempo",
  "rem.norecord": "sem registo",
  "price.h": "Tabela de preços",
  "price.add": "+ serviço",
  "price.svc": "Serviço",
  "price.note": "O total usa o tipo do veículo (citadino, SUV, van…).",
  "cash.month": "Mês",
  "cash.in": "Recebido",
  "cash.receive": "A receber",
  "cash.pendingN": "{n} pagamentos pendentes",
  "cash.pending": "A receber",
  "cash.in": "recebido",
  "cash.out": "por cobrar",
  "cash.pending": "Por cobrar",
  "cash.nopend": "Nada pendente neste mês.",
  "cash.got": "Recebido",
  "cash.nogot": "Sem recebimentos neste mês.",
  "cash.period": "Período",
  "cash.mes": "Mês",
  "cash.t1": "1.º trim.",
  "cash.t2": "2.º trim.",
  "cash.t3": "3.º trim.",
  "cash.t4": "4.º trim.",
  "cash.year": "Ano",
  "cash.bal": "Balancete",
  "cash.washes": "Lavagens",
  "cash.openN": "Ainda abertas",
  "cash.doneN": "Concluídas",
  "cash.cancelN": "Canceladas",
  "cash.faltaN": "Não veio",
  "cash.billed": "Faturado",
  "cash.best": "Melhor mês do ano",
  "cash.bestLine": "{month} · {money} · {n} {word}",
  "cash.wash1": "lavagem",
  "cash.washN": "lavagens",
  "cash.bestNone": "Ainda não há movimento neste ano.",
  "cash.bySvc": "Por serviço",
  "cash.bySize": "Por tipo de veículo",
  "cash.byPay": "Por forma de pagamento",
  "cash.yearTable": "Comparativo do ano {year}",
  "cash.quarters": "Trimestres",
  "cash.colMonth": "Mês",
  "cash.colN": "Lavagens",
  "cash.colDone": "Concluídas",
  "cash.colGot": "Recebido",
  "cash.colPend": "A receber",
  "cash.colBill": "Faturado",
  "cash.total": "Total",
  "cash.print": "Imprimir",
  "cash.qty": "Quantidade",
  "more.price": "Preços",
  "more.price2": "Tabela por tipo de veículo",
  "more.cash": "Caixa",
  "more.cash2": "Balancete mensal, trimestral e anual",
  "more.team": "Equipa",
  "more.team2": "Quem lava",
  "more.shop": "Oficina",
  "more.shop2": "Nome, WhatsApp, horário, dias de aviso",
  "more.bak": "Cópia de segurança",
  "more.bak2": "Exportar e restaurar. Sem isto perde a oficina.",
  "more.foot": "Os dados ficam neste telemóvel. Exporte uma cópia cada dia.",
  "more.team2": "Quem lava (não é acesso de empregados)",
  "team.note": "Isto é quem lava, não são contas de acesso. Para outro funcionário ver o mesmo: Mais → Cópia → Exportar, e no outro telemóvel Restaurar.",
  "more.foot": "Controle de Lavagens · dados só neste aparelho.",
  "inst.h": "Instalar a app",
  "inst.p": "Ponha-a no ecrã inicial. Abre em ecrã inteiro, como uma aplicação, sem o navegador.",
  "inst.go": "Instalar",
  "inst.how": "Como instalar",
  "inst.later": "Agora não",
  "inst.ok": "App instalada",
  "inst.ok2": "Abra-a pelo ícone Lavados no ecrã inicial.",
  "inst.more": "Instalar neste telemóvel",
  "inst.more2": "Ecrã inteiro, como uma aplicação",
  "inst.android": "No Chrome, toque nos três pontos ⋮ no canto. Depois Instalar aplicação ou Adicionar ao ecrã inicial. Abra o ícone Lavados.",
  "inst.ios": "No Safari, toque em Partilhar e depois Adicionar ao ecrã inicial. Abra o ícone Lavados.",
  "inst.desk": "No computador, use o ícone de instalar na barra de endereço, ou o menu do navegador: Instalar Control de Lavados.",
  "team.h": "Equipa",
  "team.add": "+ pessoa",
  "team.on": "Activo",
  "team.off": "Inactivo",
  "shop.name": "Nome da oficina",
  "shop.wa": "WhatsApp / telefone",
  "shop.prefix": "Prefixo do país",
  "shop.addr": "Morada",
  "shop.open": "Abre",
  "shop.close": "Fecha",
  "shop.days": "Lembrar após (dias)",
  "shop.cur": "Moeda",
  "shop.lang": "Idioma",
  "shop.save": "Guardar",
  "setup.h": "Prepare a sua oficina",
  "setup.p": "Nome real, quem lava, os seus preços. Tire o dia de exemplo se ainda estiver.",
  "setup.name": "Nome da oficina",
  "setup.staff": "Quem lava",
  "setup.price": "Rever preços",
  "setup.demo": "Tirar o dia de exemplo",
  "setup.demo2": "Apagam-se Maria, João e Ana. O que criou fica.",
  "setup.todo": "Por fazer",
  "setup.done": "Feito",
  "setup.go": "Abrir",
  "setup.clear": "Tirar exemplo",
  "setup.confirm": "Apagam-se os clientes de exemplo e as marcações deles. O que criou fica. Continuar?",
  "setup.priceOk": "Estes preços estão bem",
  "setup.priceDone": "Preços guardados para a oficina.",
  "job.missing": "Marcação não encontrada.",
  "job.paid": "Pago",
  "job.unpaid": "Ainda não pago",
  "job.start": "Começar",
  "job.done": "Terminar lavagem",
  "job.pay": "Receber",
  "job.start": "Iniciar",
  "job.done": "Concluir",
  "job.reschedule": "Remarcar",
  "job.edit": "Editar",
  "job.warn": "Avisar marcação",
  "job.cancel": "Cancelar",
  "job.ready": "Já pode vir buscar",
  "job.readyDone": "Aviso de recolha enviado",
  "form.editjob": "Editar marcação",
  "form.newjob": "Nova marcação",
  "form.client": "Cliente",
  "form.vehicle": "Veículo",
  "form.day": "Dia",
  "form.time": "Hora",
  "form.who": "Responsável",
  "form.duration": "Duração (min)",
  "form.conflict": "Choque de horário com {who} às {time}.",
  "form.noconflict": "Horário livre para este responsável.",
  "form.state": "Estado da lavagem",
  "form.state": "Estado",
  "form.disc": "Desconto",
  "form.notes": "Notas",
  "form.save": "Guardar",
  "form.close": "Fechar",
  "form.editc": "Editar cliente",
  "form.newc": "Novo cliente",
  "form.name": "Nome",
  "form.nameHint": "Escreva o nome. Se o cliente já existir, escolha na lista.",
  "form.phone": "Telefone / WhatsApp",
  "form.mail": "E-mail",
  "form.delc": "Apagar cliente",
  "form.delv": "Apagar veículo",
  "form.editv": "Editar veículo",
  "form.newv": "Novo veículo",
  "form.plate": "Matrícula",
  "form.brand": "Marca",
  "form.model": "Modelo",
  "form.color": "Cor",
  "form.type": "Tipo",
  "st.pedido": "Pedido",
  "st.confirmado": "Confirmado",
  "st.curso": "Em curso",
  "st.feito": "Concluído",
  "st.cancelado": "Cancelado",
  "st.falta": "Não veio",
  "size.citadino": "Citadino",
  "size.berlina": "Berlina",
  "size.suv": "SUV",
  "size.van": "Van",
  "size.moto": "Moto",
  "pay.list": "Numerário,Transferência,Cartão,MB Way,Bizum,Pendente",
  "pay.cash": "Numerário",
  "pay.pend": "Pendente",
  "pay.done": "Pago com {method}",
  "alert.name": "Ponha o nome.",
  "alert.delc": "Apagar este cliente e os veículos?",
  "alert.delv": "Apagar este veículo?",
  "alert.noclient": "Falta o cliente.",
  "alert.noveh": "Falta o veículo.",
  "alert.nosvc": "Escolha pelo menos um serviço.",
  "alert.conflict": "Há outro serviço à mesma hora. Guardar mesmo assim?",
  "alert.pay": "Como pagou?",
  "alert.staff": "Nome",
  "alert.bak": "Não deu para restaurar: ",
  "bak.h": "Cópia de segurança",
  "bak.p": "Guarde o ficheiro fora deste telemóvel: Drive, WhatsApp (envie a si mesmo) ou USB. Restaurar recupera. Sem isto, se o telemóvel se perde, perde a oficina.",
  "bak.out": "Guardar ficheiro",
  "bak.in": "Restaurar",
  "bak.share": "Enviar (WhatsApp, Drive…)",
  "bak.shareText": "Cópia de Control de Lavados. Guarde-a fora deste telemóvel.",
  "bak.never": "Ainda não há cópia",
  "bak.last": "Última cópia: {when}",
  "bak.today": "hoje",
  "bak.days": "há {n} dias",
  "bak.warn": "Sem cópia recente. Se este telemóvel se perder, perde a oficina.",
  "bak.do": "Fazer cópia",
  "bak.later": "Hoje não",
  "bak.ok": "Cópia pronta. Guarde o ficheiro fora deste telemóvel.",
  "bak.confirm": "Isto substitui todos os dados deste telemóvel. Continuar?",
  "svc.new": "Novo serviço",
  "staff.1": "Lavador 1",
  "wa.hello": "Olá {name}, aqui é {shop}.",
  "wa.book": "Olá {name}, a lavagem do {vehicle} ficou marcada para {date} às {time}. {shop}",
  "wa.remind": "Olá {name}, a última lavagem do {vehicle} foi há {when} ({last}). Quer marcar a próxima? {shop}",
  "wa.ready": "Olá {name}, a lavagem do {vehicle} já terminou. Pode vir buscá-lo. {shop}",
});
I18N["pt-BR"] = Object.assign({}, I18N.pt, {
  "welcome.p": "Agenda da lavagem: clientes, veículos, preços, marcações e aviso da última limpeza. Tudo fica neste celular.",
  "staff.1": "Lavador 1",
  "shop.addr": "Endereço",
  "job.ready": "Já pode buscar o carro",
  "wa.ready": "Olá {name}, a lavagem do {vehicle} já terminou. Pode vir buscar. {shop}",
  "size.citadino": "Popular",
  "pay.list": "Dinheiro,Transferência,Cartão,Pix,MB Way,Pendente",
  "pay.cash": "Dinheiro",
  "bak.p": "Guarde o arquivo no celular ou envie para você no WhatsApp.",
});

function lang() {
  const code = db?.settings?.lang || "es";
  return I18N[code] ? code : "es";
}
function t(key, vars) {
  const pack = I18N[lang()] || I18N.es;
  let s = pack[key] || I18N.es[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      s = s.split("{" + k + "}").join(vars[k]);
    });
  }
  return s;
}
function loc() {
  return { es: "es-ES", pt: "pt-PT", "pt-BR": "pt-BR" }[lang()] || "es-ES";
}
function payList() {
  return t("pay.list").split(",").map((s) => s.trim()).filter(Boolean);
}

function payMethods() {
  const pend = [t("pay.pend"), "Pendiente", "Pendente"].map((s) => s.toLowerCase());
  return payList().filter((m) => !pend.includes(m.toLowerCase()));
}

function paySheet(job) {
  const client = clientById(job.clientId);
  return `
    <div class="sheet">
      <h2>${t("alert.pay")}</h2>
      <p class="total">${fmtMoney(jobTotal(job))}</p>
      <p class="muted">${esc(client?.name || "")}</p>
      <div class="pay-grid">
        ${payMethods()
          .map(
            (m) =>
              `<button class="btn pay-btn" data-act="pay-ok" data-id="${job.id}" data-method="${esc(m)}">${esc(m)}</button>`
          )
          .join("")}
      </div>
      <div class="actions">
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

const $ = (id) => document.getElementById(id);
const view = $("view");
const modal = $("modal");

let db = load();
let monthCursor = startOfMonth(new Date());
let selectedDay = isoDate(new Date());
let clientQuery = "";
let cashView = "mes";
let deferredInstall = null;

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isoDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function parseISO(value) {
  const [y, m, d] = String(value).split("-").map(Number);
  return new Date(y, m - 1, d);
}

function fmtDate(value) {
  if (!value) return "—";
  const d = parseISO(value);
  return d.toLocaleDateString(loc(), { day: "2-digit", month: "short", year: "numeric" });
}

function fmtMoney(n) {
  const cur = db.settings.currency || "EUR";
  return Number(n || 0).toLocaleString(loc(), { style: "currency", currency: cur });
}

function daysBetween(a, b) {
  return Math.round((parseISO(b) - parseISO(a)) / 86400000);
}

function today() {
  return isoDate(new Date());
}

function defaultServices() {
  const row = (name, category, durationMin, prices) => ({
    id: uid(),
    name,
    category,
    durationMin,
    active: true,
    prices,
  });
  return [
    row("Lavado exterior", "base", 30, { citadino: 12, berlina: 15, suv: 20, van: 25, moto: 8 }),
    row("Lavado interior", "base", 40, { citadino: 15, berlina: 18, suv: 25, van: 30, moto: 0 }),
    row("Lavado completo", "base", 60, { citadino: 22, berlina: 28, suv: 38, van: 45, moto: 12 }),
    row("Motor", "extra", 25, { citadino: 20, berlina: 22, suv: 25, van: 28, moto: 15 }),
    row("Cera / protección", "extra", 20, { citadino: 15, berlina: 18, suv: 25, van: 30, moto: 10 }),
    row("Llantas", "extra", 15, { citadino: 10, berlina: 12, suv: 15, van: 18, moto: 8 }),
    row("Tapicería", "premium", 90, { citadino: 40, berlina: 50, suv: 70, van: 80, moto: 0 }),
    row("Pulido", "premium", 180, { citadino: 80, berlina: 100, suv: 140, van: 160, moto: 40 }),
    row("Ozono / desinfección", "extra", 30, { citadino: 25, berlina: 25, suv: 30, van: 35, moto: 15 }),
    row("Detailing premium", "premium", 240, { citadino: 120, berlina: 150, suv: 200, van: 240, moto: 60 }),
  ];
}

function emptyDb() {
  return {
    version: 1,
    settings: {
      businessName: "Control de Lavados",
      owner: "",
      phone: "",
      whatsapp: "",
      address: "",
      city: "",
      prefix: "34",
      currency: "EUR",
      openHour: "09:00",
      closeHour: "19:00",
      slotMin: 30,
      workDays: [1, 2, 3, 4, 5, 6],
      reminderDays: 30,
      lang: "es",
      seeded: false,
      welcome: true,
      lastBackupAt: "",
      bakSnooze: "",
      pricesOk: false,
    },
    staff: [{ id: "s1", name: "Operario 1", active: true }],
    services: defaultServices(),
    clients: [],
    vehicles: [],
    jobs: [],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyDb();
    const data = JSON.parse(raw);
    const base = emptyDb();
    const settings = { ...base.settings, ...(data.settings || {}) };
    const renamed = settings.businessName === "Controle de Lavagens";
    if (renamed) settings.businessName = "Control de Lavados";
    const loaded = {
      ...base,
      ...data,
      settings,
      staff: data.staff?.length ? data.staff : base.staff,
      services: data.services?.length ? data.services : base.services,
      clients: data.clients || [],
      vehicles: data.vehicles || [],
      jobs: data.jobs || [],
    };
    if (renamed) {
      try {
        localStorage.setItem(KEY, JSON.stringify(loaded));
      } catch {
        /* ignore */
      }
    }
    return loaded;
  } catch {
    return emptyDb();
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function daysSinceBackup() {
  const at = db.settings.lastBackupAt;
  if (!at) return Infinity;
  const t0 = new Date(at).getTime();
  if (Number.isNaN(t0)) return Infinity;
  return Math.floor((Date.now() - t0) / 86400000);
}

function fmtBackupWhen() {
  const days = daysSinceBackup();
  if (!Number.isFinite(days)) return t("bak.never");
  const when = days <= 0 ? t("bak.today") : t("bak.days", { n: days });
  return t("bak.last", { when });
}

function backupStale() {
  if (db.settings.welcome) return false;
  if (!db.jobs.length && !db.clients.length) return false;
  if (db.settings.bakSnooze === today()) return false;
  return daysSinceBackup() >= 1;
}

function backupCard() {
  if (!backupStale()) return "";
  return `
    <div class="card backup-card">
      <h2>${t("bak.h")}</h2>
      <p>${t("bak.warn")}</p>
      <p class="muted">${esc(fmtBackupWhen())}</p>
      <div class="actions">
        <button class="btn wide" data-act="backup">${t("bak.do")}</button>
        <button class="btn ghost" data-act="backup-later">${t("bak.later")}</button>
      </div>
    </div>`;
}

function backupSheet() {
  return `
    <div class="sheet">
      <h2>${t("bak.h")}</h2>
      <p>${t("bak.p")}</p>
      <p class="muted">${esc(fmtBackupWhen())}</p>
      <div class="actions">
        <button class="btn wide" data-act="backup-share">${t("bak.share")}</button>
        <button class="btn ghost wide" data-act="export">${t("bak.out")}</button>
        <button class="btn ghost wide" data-act="import">${t("bak.in")}</button>
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

function backupBlob() {
  return new Blob([JSON.stringify(db, null, 2)], { type: "application/json" });
}

function backupFileName() {
  return `control-lavados-${today()}.json`;
}

function markBackupDone() {
  db.settings.lastBackupAt = new Date().toISOString();
  db.settings.bakSnooze = "";
  save();
}

function backupDownload() {
  markBackupDone();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(backupBlob());
  a.download = backupFileName();
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  closeModal();
  render();
}

async function backupShare() {
  const blob = backupBlob();
  const name = backupFileName();
  try {
    const file = new File([blob], name, { type: "application/json" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: t("bak.h"), text: t("bak.shareText") });
      markBackupDone();
      closeModal();
      render();
      return;
    }
  } catch (err) {
    if (err && err.name === "AbortError") return;
  }
  backupDownload();
}

function clientById(id) {
  return db.clients.find((c) => c.id === id);
}
function vehicleById(id) {
  return db.vehicles.find((v) => v.id === id);
}
function staffById(id) {
  return db.staff.find((s) => s.id === id);
}
function serviceById(id) {
  return db.services.find((s) => s.id === id);
}

function vehiclesOf(clientId) {
  return db.vehicles.filter((v) => v.clientId === clientId);
}

function jobsOfVehicle(vehicleId) {
  return db.jobs
    .filter((j) => j.vehicleId === vehicleId && j.status === "feito")
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function lastWash(vehicleId) {
  return jobsOfVehicle(vehicleId)[0] || null;
}

function sizeLabel(id) {
  return t("size." + id) || id || "—";
}

function priceOf(service, size) {
  return Number(service?.prices?.[size] || 0);
}

function jobTotal(job) {
  if (job.total != null && job.total !== "") return Number(job.total);
  const vehicle = vehicleById(job.vehicleId);
  const size = vehicle?.size || "berlina";
  const sum = (job.serviceIds || []).reduce((acc, id) => acc + priceOf(serviceById(id), size), 0);
  return Math.max(0, sum - Number(job.discount || 0));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function lastIsoDay(year, month) {
  const day = new Date(Number(year), Number(month), 0).getDate();
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function capWord(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

function fmtMonthName(ym) {
  const [y, m] = String(ym).split("-").map(Number);
  return capWord(new Date(y, m - 1, 1).toLocaleDateString(loc(), { month: "long" }));
}

function fmtMonthYear(ym) {
  const [y, m] = String(ym).split("-").map(Number);
  return capWord(new Date(y, m - 1, 1).toLocaleDateString(loc(), { month: "long", year: "numeric" }));
}

function cashBounds() {
  const y = selectedDay.slice(0, 4);
  const m = Number(selectedDay.slice(5, 7));
  if (cashView === "anio") {
    return { from: `${y}-01-01`, to: `${y}-12-31`, year: y };
  }
  if (/^t[1-4]$/.test(cashView)) {
    const q = Number(cashView[1]);
    const startM = (q - 1) * 3 + 1;
    const endM = startM + 2;
    return { from: `${y}-${pad2(startM)}-01`, to: lastIsoDay(y, endM), year: y, q };
  }
  return { from: `${y}-${pad2(m)}-01`, to: lastIsoDay(y, m), year: y, month: m };
}

function jobsBetween(from, to) {
  return db.jobs.filter((j) => j.date >= from && j.date <= to);
}

function sumJobs(jobs) {
  return jobs.reduce((a, j) => a + jobTotal(j), 0);
}

function bumpMap(map, key, money) {
  if (!key) return;
  const cur = map.get(key) || { n: 0, money: 0 };
  cur.n += 1;
  cur.money += money;
  map.set(key, cur);
}

function jobTally(jobs) {
  const done = jobs.filter((j) => j.status === "feito");
  const open = jobs.filter((j) => j.status === "pedido" || j.status === "confirmado" || j.status === "curso");
  const paid = jobs.filter((j) => j.paid && j.status !== "cancelado");
  const pending = jobs.filter((j) => !j.paid && j.status === "feito");
  const cancelled = jobs.filter((j) => j.status === "cancelado");
  const falta = jobs.filter((j) => j.status === "falta");
  const cobrado = sumJobs(paid);
  const recibir = sumJobs(pending);
  const byService = new Map();
  const bySize = new Map();
  const byPay = new Map();
  done.forEach((j) => {
    const vehicle = vehicleById(j.vehicleId);
    const size = vehicle?.size || "berlina";
    bumpMap(bySize, t("size." + size), jobTotal(j));
    (j.serviceIds || []).forEach((sid) => {
      const svc = serviceById(sid);
      bumpMap(byService, svc?.name || sid, priceOf(svc, size));
    });
  });
  paid.forEach((j) => bumpMap(byPay, j.payMethod || t("pay.cash"), jobTotal(j)));
  const sortMap = (map) => [...map.entries()].sort((a, b) => b[1].n - a[1].n || b[1].money - a[1].money);
  return {
    done,
    open,
    paid,
    pending,
    cancelled,
    falta,
    nDone: done.length,
    nOpen: open.length,
    nPaid: paid.length,
    nPend: pending.length,
    nCancel: cancelled.length,
    nFalta: falta.length,
    cobrado,
    recibir,
    facturado: cobrado + recibir,
    byService: sortMap(byService),
    bySize: sortMap(bySize),
    byPay: sortMap(byPay),
  };
}

function yearMonthTallies(year) {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const ym = `${year}-${pad2(month)}`;
    return { ym, ...jobTally(jobsBetween(`${ym}-01`, lastIsoDay(year, month))) };
  });
}

function quarterTallies(year) {
  return [1, 2, 3, 4].map((q) => {
    const startM = (q - 1) * 3 + 1;
    const endM = startM + 2;
    return {
      q,
      label: t("cash.t" + q),
      ...jobTally(jobsBetween(`${year}-${pad2(startM)}-01`, lastIsoDay(year, endM))),
    };
  });
}

function bestMonthRow(rows) {
  return rows.reduce((best, row) => {
    if (!best) return row;
    if (row.facturado > best.facturado) return row;
    if (row.facturado === best.facturado && row.nDone > best.nDone) return row;
    return best;
  }, null);
}

function breakdownTable(title, rows) {
  if (!rows.length) return "";
  return `
    <div class="card">
      <h2>${title}</h2>
      <div class="table-wrap">
        <table class="bal">
          <thead><tr><th></th><th>${t("cash.qty")}</th><th>${t("cash.colBill")}</th></tr></thead>
          <tbody>
            ${rows
              .map(([name, v]) => `<tr><td>${esc(name)}</td><td>${v.n}</td><td>${fmtMoney(v.money)}</td></tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    </div>`;
}

function balRow(label, row, max, extraClass = "") {
  return `<tr class="${extraClass}">
    <td>${esc(label)}</td>
    <td>${row.nDone}</td>
    <td>${fmtMoney(row.cobrado)}</td>
    <td>${fmtMoney(row.recibir)}</td>
    <td>${fmtMoney(row.facturado)}</td>
  </tr>`;
}

function jobsOn(date) {
  return db.jobs
    .filter((j) => j.date === date && j.status !== "cancelado")
    .sort((a, b) => String(a.start).localeCompare(String(b.start)));
}

function conflictWith(job) {
  return db.jobs.find((other) => {
    if (other.id === job.id || other.date !== job.date) return false;
    if (other.status === "cancelado") return false;
    if (other.staffId && job.staffId && other.staffId !== job.staffId) return false;
    return other.start < job.end && job.start < other.end;
  }) || null;
}

function conflict(job) {
  return Boolean(conflictWith(job));
}

function draftFromForm(id) {
  const duration = Number($("fDur")?.value) || selectedDuration();
  const start = $("fStart")?.value || "10:00";
  return {
    id: id || "new",
    date: $("fDate")?.value,
    start,
    end: addMinutes(start, duration),
    staffId: $("fStaff")?.value,
    status: "confirmado",
  };
}

function selectedDuration() {
  const typed = Number($("fDur")?.value);
  const fromSvc = selectedServiceIds().reduce((a, sid) => a + Number(serviceById(sid)?.durationMin || 0), 0);
  if (typed > 0) return typed;
  return fromSvc || Number(db.settings.slotMin || 30);
}

function syncDurationFromServices() {
  const box = $("fDur");
  if (!box) return;
  const fromSvc = selectedServiceIds().reduce((a, sid) => a + Number(serviceById(sid)?.durationMin || 0), 0);
  if (fromSvc) box.value = fromSvc;
}

function showConflict(id) {
  const box = $("fConflict");
  if (!box) return;
  const draft = draftFromForm(id);
  const other = conflictWith(draft);
  if (other) {
    box.className = "warn-box";
    box.textContent = t("form.conflict", {
      who: staffById(other.staffId)?.name || t("form.who"),
      time: other.start,
    });
  } else {
    box.className = "ok-box";
    box.textContent = t("form.noconflict");
  }
}

function chipPaid(job) {
  return job.paid
    ? `<span class="chip done">${t("job.paid")}</span>`
    : `<span class="chip stop">${t("job.unpaid")}</span>`;
}

function dueVehicles() {
  const days = Number(db.settings.reminderDays || 30);
  const now = today();
  return db.vehicles
    .map((vehicle) => {
      const last = lastWash(vehicle.id);
      const lastDate = last?.date || vehicle.lastServiceAt || "";
      const elapsed = lastDate ? daysBetween(lastDate, now) : 999;
      const next = lastDate
        ? isoDate(new Date(parseISO(lastDate).getTime() + days * 86400000))
        : "";
      return { vehicle, last, lastDate, elapsed, next, overdue: elapsed >= days };
    })
    .sort((a, b) => b.elapsed - a.elapsed);
}

function digitsPhone(phone) {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  const prefix = db.settings.prefix || "34";
  if (d.length === 9) d = prefix + d;
  return d;
}

function waLink(phone, text) {
  const d = digitsPhone(phone);
  if (!d) return "";
  return `https://wa.me/${d}?text=${encodeURIComponent(text)}`;
}

function vehicleTitle(vehicle) {
  if (!vehicle) return "Veículo";
  return [vehicle.brand, vehicle.model, vehicle.plate].filter(Boolean).join(" ") || t("form.vehicle");
}

function hashParts() {
  const raw = (location.hash || "#hoje").slice(1);
  const [page, id] = raw.split("/");
  return { page: page || "hoje", id: id || "" };
}

function go(hash) {
  location.hash = hash;
}

function seedExample() {
  const c1 = { id: uid(), name: "Maria Silva", phone: "612345678", notes: "", createdAt: today() };
  const c2 = { id: uid(), name: "João Pereira", phone: "698765432", notes: "", createdAt: today() };
  const c3 = { id: uid(), name: "Ana Costa", phone: "655000111", notes: "", createdAt: today() };
  const v1 = { id: uid(), clientId: c1.id, plate: "1234 ABC", brand: "VW", model: "Golf", color: "Branco", size: "berlina" };
  const v2 = { id: uid(), clientId: c2.id, plate: "9876 XYZ", brand: "BMW", model: "X3", color: "Preto", size: "suv" };
  const v3 = { id: uid(), clientId: c3.id, plate: "5555 LMN", brand: "Seat", model: "Ibiza", color: "Azul", size: "citadino" };
  const full = db.services.find((s) => /complet/i.test(s.name));
  const ext = db.services.find((s) => /exterior/i.test(s.name));
  const old = isoDate(new Date(Date.now() - 42 * 86400000));
  db.clients.push(c1, c2, c3);
  db.vehicles.push(v1, v2, v3);
  db.jobs.push(
    {
      id: uid(),
      clientId: c1.id,
      vehicleId: v1.id,
      staffId: db.staff[0].id,
      date: old,
      start: "10:00",
      end: "11:00",
      serviceIds: [full.id],
      status: "feito",
      discount: 0,
      paid: true,
      payMethod: "Numerário",
      notes: "",
    },
    {
      id: uid(),
      clientId: c3.id,
      vehicleId: v3.id,
      staffId: db.staff[0].id,
      date: today(),
      start: "11:00",
      end: "12:00",
      serviceIds: [ext.id],
      status: "confirmado",
      discount: 0,
      paid: false,
      payMethod: "Pendente",
      notes: "",
    },
    {
      id: uid(),
      clientId: c2.id,
      vehicleId: v2.id,
      staffId: db.staff[0].id,
      date: isoDate(new Date(Date.now() + 86400000)),
      start: "16:00",
      end: "17:30",
      serviceIds: [full.id],
      status: "pedido",
      discount: 0,
      paid: false,
      payMethod: "Pendente",
      notes: "SUV com pêlo de cão",
    }
  );
  db.settings.seeded = true;
  db.settings.welcome = false;
  save();
}

function startEmpty() {
  db.settings.welcome = false;
  save();
  go("oficina");
  render();
}

function foldName(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isDemoClient(client) {
  const n = foldName(client?.name);
  return n === "maria silva" || n === "joao pereira" || n === "ana costa";
}

function hasDemoData() {
  return db.settings.seeded || db.clients.some(isDemoClient);
}

function isDefaultShopName() {
  const n = foldName(db.settings.businessName);
  return !n || n === "control de lavados" || n === "controle de lavagens";
}

function isDefaultStaff() {
  const active = db.staff.filter((s) => s.active);
  if (!active.length) return true;
  return active.every((s) => {
    const n = foldName(s.name);
    return n === "operario 1" || n === "lavador 1";
  });
}

function setupItems() {
  const items = [
    { id: "name", ok: !isDefaultShopName(), label: t("setup.name"), hash: "oficina" },
    { id: "staff", ok: !isDefaultStaff(), label: t("setup.staff"), hash: "equipa" },
    { id: "price", ok: !!db.settings.pricesOk, label: t("setup.price"), hash: "precos" },
  ];
  if (hasDemoData()) items.push({ id: "demo", ok: false, label: t("setup.demo"), hash: "" });
  return items;
}

function setupDone() {
  return setupItems().every((x) => x.ok);
}

function setupCard() {
  if (db.settings.welcome || setupDone()) return "";
  const items = setupItems();
  return `
    <div class="card setup-card">
      <h2>${t("setup.h")}</h2>
      <p>${t("setup.p")}</p>
      ${items
        .map((item) => {
          if (item.id === "demo") {
            return `<div class="setup-row">
              <span>${esc(item.label)}<small>${t("setup.demo2")}</small></span>
              <button class="btn ghost" data-act="clear-demo">${t("setup.clear")}</button>
            </div>`;
          }
          return `<div class="setup-row ${item.ok ? "ok" : ""}">
            <span>${esc(item.label)}<small>${item.ok ? t("setup.done") : t("setup.todo")}</small></span>
            ${item.ok ? "" : `<button class="btn ghost" data-act="go" data-hash="${item.hash}">${t("setup.go")}</button>`}
          </div>`;
        })
        .join("")}
    </div>`;
}

function clearDemo() {
  if (!confirm(t("setup.confirm"))) return;
  const drop = new Set(db.clients.filter(isDemoClient).map((c) => c.id));
  db.jobs = db.jobs.filter((j) => !drop.has(j.clientId));
  db.vehicles = db.vehicles.filter((v) => !drop.has(v.clientId));
  db.clients = db.clients.filter((c) => !drop.has(c.id));
  db.settings.seeded = false;
  save();
  render();
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function chipStatus(status) {
  const meta = STATUS[status] || STATUS.pedido;
  return `<span class="chip ${meta.chip}">${t("st." + status)}</span>`;
}

function readyText(job) {
  const client = clientById(job.clientId);
  const vehicle = vehicleById(job.vehicleId);
  return t("wa.ready", {
    name: client?.name || "",
    vehicle: vehicleTitle(vehicle),
    shop: db.settings.businessName,
  });
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function installHidden() {
  try {
    return localStorage.getItem(INSTALL_HIDE) === "1";
  } catch {
    return false;
  }
}

function hideInstallBanner() {
  try {
    localStorage.setItem(INSTALL_HIDE, "1");
  } catch {
    /* ignore */
  }
}

function installHowText() {
  if (isIos()) return t("inst.ios");
  if (/android/i.test(navigator.userAgent)) return t("inst.android");
  return t("inst.desk");
}

function installCard() {
  if (isStandalone() || installHidden()) return "";
  return `
    <div class="card install-card">
      <h2>${t("inst.h")}</h2>
      <p>${t("inst.p")}</p>
      <div class="actions">
        <button class="btn wide" data-act="install-app">${t("inst.go")}</button>
        <button class="btn ghost" data-act="install-how">${t("inst.how")}</button>
        <button class="btn ghost" data-act="install-later">${t("inst.later")}</button>
      </div>
    </div>`;
}

function installSheet() {
  return `
    <div class="sheet">
      <h2>${t("inst.h")}</h2>
      <p>${t("inst.p")}</p>
      <p>${esc(installHowText())}</p>
      <div class="actions">
        ${deferredInstall ? `<button class="btn wide" data-act="install-native">${t("inst.go")}</button>` : ""}
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

async function startInstall() {
  if (deferredInstall) {
    try {
      deferredInstall.prompt();
      const choice = await deferredInstall.userChoice;
      deferredInstall = null;
      if (choice.outcome === "accepted") hideInstallBanner();
      closeModal();
      render();
      return;
    } catch {
      /* fall through to instructions */
    }
  }
  openModal(installSheet());
}

function pageWelcome() {
  $("pageTitle").textContent = t("welcome.empty");
  return `
    <div class="card">
      <h2>${t("welcome.h")}</h2>
      <p>${t("welcome.p")}</p>
      <p class="muted">${t("inst.p")}</p>
      <div class="actions">
        <button class="btn wide" data-act="start-empty">${t("welcome.empty")}</button>
        <button class="btn ghost wide" data-act="seed">${t("welcome.demo")}</button>
      </div>
    </div>`;
}

function pageHoje() {
  const list = jobsOn(today());
  const due = dueVehicles().filter((x) => x.overdue && x.lastDate).length;
  const pendingJobs = db.jobs.filter((j) => j.status === "feito" && !j.paid);
  const pendingMoney = pendingJobs.reduce((a, j) => a + jobTotal(j), 0);
  const money = db.jobs
    .filter((j) => j.date === today() && j.paid)
    .reduce((a, j) => a + jobTotal(j), 0);
  return `
    ${installCard()}
    ${backupCard()}
    ${setupCard()}
    <div class="grid">
      <div class="stat"><b>${list.length}</b><span>${t("hoje.washes")}</span></div>
      <div class="stat"><b>${fmtMoney(money)}</b><span>${t("hoje.paid")}</span></div>
      <div class="stat">
        <b>${fmtMoney(pendingMoney)}</b>
        <span>${t("hoje.receive")}</span>
        <small>${t("hoje.pendingN", { n: pendingJobs.length })}</small>
      </div>
      <div class="stat"><b>${due}</b><span>${t("hoje.remind")}</span></div>
    </div>
    <div class="card">
      <div class="row"><h2>${t("hoje.queue")}</h2><button class="btn ghost" data-act="nova" data-date="${today()}">${t("book")}</button></div>
      ${list.length ? list.map(jobItem).join("") : `<p class="empty">${t("hoje.empty")}</p>`}
    </div>`;
}

function jobItem(job) {
  const client = clientById(job.clientId);
  const vehicle = vehicleById(job.vehicleId);
  return `
    <button class="item" data-act="open-job" data-id="${job.id}">
      <div class="grow">
        <strong>${esc(fmtDate(job.date))} · ${esc(job.start)} · ${esc(client?.name || t("title.cliente"))}</strong>
        <small>${esc(vehicleTitle(vehicle))} · ${fmtMoney(jobTotal(job))} · ${esc(staffById(job.staffId)?.name || "")}</small>
      </div>
      <span class="chips">${chipStatus(job.status)}${chipPaid(job)}</span>
    </button>`;
}

function pageAgenda() {
  const y = monthCursor.getFullYear();
  const m = monthCursor.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  const marked = new Set(db.jobs.filter((j) => j.status !== "cancelado").map((j) => j.date));
  const list = jobsOn(selectedDay);
  const monthName = monthCursor.toLocaleDateString(loc(), { month: "long", year: "numeric" });
  return `
    <div class="card">
      <div class="row">
        <button class="btn ghost" data-act="month" data-dir="-1">‹</button>
        <strong style="text-transform:capitalize">${esc(monthName)}</strong>
        <button class="btn ghost" data-act="month" data-dir="1">›</button>
      </div>
      <div class="cal" style="margin-top:10px">
        ${t("cal").split(" ").map((d) => `<div class="dow">${d}</div>`).join("")}
        ${days
          .map((d) => {
            const iso = isoDate(d);
            const out = d.getMonth() !== m ? "out" : "";
            const on = iso === selectedDay ? "on" : "";
            const mark = marked.has(iso) ? "mark" : "";
            return `<button class="${out} ${on} ${mark}" data-act="day" data-date="${iso}">${d.getDate()}</button>`;
          })
          .join("")}
      </div>
    </div>
    <div class="card">
      <div class="row">
        <h2>${fmtDate(selectedDay)}</h2>
        <button class="btn" data-act="nova" data-date="${selectedDay}">${t("book")}</button>
      </div>
      ${list.length ? list.map(jobItem).join("") : `<p class="empty">${t("agenda.free")}</p>`}
    </div>`;
}

function pageClientes() {
  const q = clientQuery.trim().toLowerCase();
  const rows = db.clients
    .filter((c) => {
      if (!q) return true;
      const plates = vehiclesOf(c.id).map((v) => `${v.plate} ${v.brand} ${v.model}`).join(" ");
      return `${c.name} ${c.phone} ${plates}`.toLowerCase().includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name, loc()));
  return `
    <input class="search" id="qClient" placeholder="${esc(t("clients.search"))}" value="${esc(clientQuery)}" />
    <div class="actions"><button class="btn wide" data-act="new-client">${t("clients.new")}</button></div>
    <div class="list" style="margin-top:10px">
      ${
        rows.length
          ? rows
              .map((c) => {
                const vs = vehiclesOf(c.id);
                return `<button class="item" data-act="open-client" data-id="${c.id}">
                  <div class="grow"><strong>${esc(c.name)}</strong><small>${esc(c.phone || t("clients.nophone"))} · ${vs.length} ${t("clients.vehicles")}</small></div>
                </button>`;
              })
              .join("")
          : `<p class="empty">${t("clients.none")}</p>`
      }
    </div>`;
}

function pageCliente(id) {
  const client = clientById(id);
  if (!client) return `<p class="empty">${t("client.missing")}</p>`;
  const vs = vehiclesOf(id);
  const hist = db.jobs
    .filter((j) => j.clientId === id)
    .sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`))
    .slice(0, 12);
  return `
    <div class="card">
      <h2>${esc(client.name)}</h2>
      <p class="muted">${esc(client.phone || t("client.nophone"))}${client.email ? " · " + esc(client.email) : ""}</p>
      <div class="actions">
        <button class="btn" data-act="nova" data-client="${client.id}">${t("client.book")}</button>
        ${
          client.phone
            ? `<a class="btn gold" target="_blank" rel="noopener" href="${waLink(
                client.phone,
                t("wa.hello", { name: client.name, shop: db.settings.businessName })
              )}">WhatsApp</a>`
            : ""
        }
        <button class="btn ghost" data-act="edit-client" data-id="${client.id}">${t("client.edit")}</button>
      </div>
    </div>
    <div class="card">
      <div class="row"><h2>${t("client.vehicles")}</h2><button class="btn ghost" data-act="new-vehicle" data-client="${client.id}">${t("client.addv")}</button></div>
      ${
        vs.length
          ? vs
              .map((v) => {
                const last = lastWash(v.id);
                return `<button class="item" data-act="edit-vehicle" data-id="${v.id}">
                  <div class="grow">
                    <strong>${esc(vehicleTitle(v))}</strong>
                    <small>${sizeLabel(v.size)} · ${t("client.last")}: ${last ? fmtDate(last.date) : t("client.never")}</small>
                  </div>
                </button>`;
              })
              .join("")
          : `<p class="empty">${t("client.nov")}</p>`
      }
    </div>
    <div class="card">
      <h2>${t("client.hist")}</h2>
      ${hist.length ? hist.map(jobItem).join("") : `<p class="empty">${t("client.nohist")}</p>`}
    </div>`;
}

function pageLembretes() {
  const days = Number(db.settings.reminderDays || 30);
  const rows = dueVehicles();
  const overdue = rows.filter((x) => x.overdue);
  const soon = rows.filter((x) => !x.overdue && x.lastDate && x.elapsed >= days - 7);
  const block = (title, items) => `
    <div class="card">
      <h2>${title}</h2>
      ${
        items.length
          ? items
              .map(({ vehicle, lastDate, elapsed, next }) => {
                const client = clientById(vehicle.clientId);
                const when = elapsed === 999 ? t("rem.long") : elapsed + " " + t("rem.days");
                const msg = t("wa.remind", {
                  name: client?.name || "",
                  vehicle: vehicleTitle(vehicle),
                  when,
                  last: lastDate ? fmtDate(lastDate) : t("rem.norecord"),
                  shop: db.settings.businessName,
                });
                const href = client?.phone ? waLink(client.phone, msg) : "";
                return `<div class="item">
                  <div class="grow">
                    <strong>${esc(client?.name || t("title.cliente"))} · ${esc(vehicleTitle(vehicle))}</strong>
                    <small>${
                      lastDate ? `${t("rem.last")} ${fmtDate(lastDate)} · ${elapsed} ${t("rem.days")}` : t("rem.never")
                    }${next ? ` · ${t("rem.next")} ${fmtDate(next)}` : ""}</small>
                  </div>
                  <div class="actions" style="margin:0">
                    ${href ? `<a class="btn gold" target="_blank" rel="noopener" href="${href}">WhatsApp</a>` : ""}
                    <button class="btn" data-act="nova" data-client="${vehicle.clientId}" data-vehicle="${vehicle.id}">${t("book")}</button>
                  </div>
                </div>`;
              })
              .join("")
          : `<p class="empty">${t("rem.empty")}</p>`
      }
    </div>`;
  return `
    <p class="muted">${t("rem.help", { days })}</p>
    ${block(t("rem.over"), overdue)}
    ${block(t("rem.week"), soon)}`;
}

function pagePreços() {
  const sizes = SIZES;
  return `
    <div class="card">
      <div class="row"><h2>${t("price.h")}</h2><button class="btn ghost" data-act="new-service">${t("price.add")}</button></div>
      <div style="overflow:auto">
        <table class="price-table">
          <thead>
            <tr>
              <th>${t("price.svc")}</th>
              ${sizes.map((s) => `<th>${t("size." + s.id)}</th>`).join("")}
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${db.services
              .map(
                (svc) => `<tr>
                <td><input data-price-name="${svc.id}" value="${esc(svc.name)}" /></td>
                ${sizes
                  .map(
                    (s) =>
                      `<td><input type="number" min="0" step="0.5" data-price="${svc.id}" data-size="${s.id}" value="${
                        svc.prices[s.id] ?? 0
                      }" /></td>`
                  )
                  .join("")}
                <td><button class="btn ghost" data-act="del-service" data-id="${svc.id}">×</button></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="muted">${t("price.note")}</p>
      <div class="actions">
        <button class="btn wide" data-act="prices-ok">${db.settings.pricesOk ? t("setup.priceDone") : t("setup.priceOk")}</button>
      </div>
    </div>`;
}

function pageCaixa() {
  const month = selectedDay.slice(0, 7);
  const year = selectedDay.slice(0, 4);
  const bounds = cashBounds();
  const tally = jobTally(jobsBetween(bounds.from, bounds.to));
  const months = yearMonthTallies(year);
  const quarters = quarterTallies(year);
  const yearTally = jobTally(jobsBetween(`${year}-01-01`, `${year}-12-31`));
  const best = bestMonthRow(months);
  const hasYearMove = months.some((row) => row.nDone || row.facturado);
  const maxFact = Math.max(...months.map((row) => row.facturado), ...quarters.map((row) => row.facturado), 1);
  const views = [
    ["mes", t("cash.mes")],
    ["t1", t("cash.t1")],
    ["t2", t("cash.t2")],
    ["t3", t("cash.t3")],
    ["t4", t("cash.t4")],
    ["anio", t("cash.year")],
  ];
  const dateField =
    cashView === "mes"
      ? `<label>${t("cash.month")}</label><input type="month" id="caixaMes" value="${month}" />`
      : `<label>${t("cash.year")}</label><input type="number" id="caixaAno" min="2020" max="2100" value="${year}" />`;
  const lists =
    cashView === "mes"
      ? `<div class="card">
          <h2>${t("cash.pending")}</h2>
          ${tally.pending.length ? tally.pending.map(jobItem).join("") : `<p class="empty">${t("cash.nopend")}</p>`}
        </div>
        <div class="card">
          <h2>${t("cash.got")}</h2>
          ${tally.paid.length ? tally.paid.map(jobItem).join("") : `<p class="empty">${t("cash.nogot")}</p>`}
        </div>`
      : "";
  return `
    <div class="card">
      <div class="row">
        <h2>${t("cash.bal")}</h2>
        <button class="btn ghost no-print" data-act="print-cash">${t("cash.print")}</button>
      </div>
      <label>${t("cash.period")}</label>
      <div class="period no-print">
        ${views
          .map(
            ([id, label]) =>
              `<button type="button" class="${cashView === id ? "on" : ""}" data-act="cash-view" data-view="${id}">${label}</button>`
          )
          .join("")}
      </div>
      ${dateField}
      <div class="grid" style="margin-top:12px">
        <div class="stat"><b>${tally.nDone}</b><span>${t("cash.washes")}</span></div>
        <div class="stat"><b>${tally.nOpen}</b><span>${t("cash.openN")}</span></div>
        <div class="stat"><b>${fmtMoney(tally.cobrado)}</b><span>${t("cash.got")}</span></div>
        <div class="stat">
          <b>${fmtMoney(tally.recibir)}</b>
          <span>${t("cash.receive")}</span>
          <small>${t("cash.pendingN", { n: tally.nPend })}</small>
        </div>
        <div class="stat"><b>${fmtMoney(tally.facturado)}</b><span>${t("cash.billed")}</span></div>
        <div class="stat">
          <b>${tally.nCancel + tally.nFalta}</b>
          <span>${t("cash.cancelN")}</span>
          <small>${tally.nFalta} ${t("cash.faltaN")}</small>
        </div>
      </div>
    </div>
    <div class="card stat-gold">
      <h2>${t("cash.best")}</h2>
      ${
        hasYearMove && best
          ? `<p class="best-line">${t("cash.bestLine", {
              month: fmtMonthYear(best.ym),
              money: fmtMoney(best.facturado),
              n: best.nDone,
              word: best.nDone === 1 ? t("cash.wash1") : t("cash.washN"),
            })}</p>`
          : `<p class="empty">${t("cash.bestNone")}</p>`
      }
    </div>
    <div class="card">
      <h2>${t("cash.yearTable", { year })}</h2>
      <div class="table-wrap">
        <table class="bal">
          <thead>
            <tr>
              <th>${t("cash.colMonth")}</th>
              <th>${t("cash.colN")}</th>
              <th>${t("cash.colGot")}</th>
              <th>${t("cash.colPend")}</th>
              <th>${t("cash.colBill")}</th>
            </tr>
          </thead>
          <tbody>
            ${months.map((row) => balRow(fmtMonthName(row.ym), row, maxFact, hasYearMove && row.ym === best.ym ? "best" : "")).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <h2>${t("cash.quarters")}</h2>
      <div class="table-wrap">
        <table class="bal">
          <thead>
            <tr>
              <th></th>
              <th>${t("cash.colN")}</th>
              <th>${t("cash.colGot")}</th>
              <th>${t("cash.colPend")}</th>
              <th>${t("cash.colBill")}</th>
            </tr>
          </thead>
          <tbody>
            ${quarters.map((row) => balRow(row.label, row, maxFact)).join("")}
          </tbody>
          <tfoot>
            ${balRow(t("cash.total") + " " + year, yearTally, maxFact)}
          </tfoot>
        </table>
      </div>
    </div>
    ${breakdownTable(t("cash.bySvc"), tally.byService)}
    ${breakdownTable(t("cash.bySize"), tally.bySize)}
    ${breakdownTable(t("cash.byPay"), tally.byPay)}
    ${lists}`;
}

function pageMais() {
  const installRow = isStandalone()
    ? `<div class="item"><div class="grow"><strong>${t("inst.ok")}</strong><small>${t("inst.ok2")}</small></div></div>`
    : `<button class="item" data-act="install-app"><div class="grow"><strong>${t("inst.more")}</strong><small>${t("inst.more2")}</small></div></button>`;
  return `
    <div class="list">
      ${installRow}
      <button class="item" data-act="go" data-hash="caixa"><div class="grow"><strong>${t("more.cash")}</strong><small>${t("more.cash2")}</small></div></button>
      <button class="item" data-act="backup"><div class="grow"><strong>${t("more.bak")}</strong><small>${esc(fmtBackupWhen())} · ${t("more.bak2")}</small></div></button>
      <button class="item" data-act="go" data-hash="precos"><div class="grow"><strong>${t("more.price")}</strong><small>${t("more.price2")}</small></div></button>
      <button class="item" data-act="go" data-hash="equipa"><div class="grow"><strong>${t("more.team")}</strong><small>${t("more.team2")}</small></div></button>
      <button class="item" data-act="go" data-hash="oficina"><div class="grow"><strong>${t("more.shop")}</strong><small>${t("more.shop2")}</small></div></button>
    </div>
    <p class="muted" style="margin-top:16px">${t("more.foot")}</p>`;
}

function pageEquipa() {
  return `
    <div class="card">
      <div class="row"><h2>${t("team.h")}</h2><button class="btn ghost" data-act="new-staff">${t("team.add")}</button></div>
      <p class="muted">${t("team.note")}</p>
      ${db.staff
        .map(
          (s) => `<div class="item">
            <div class="grow"><strong>${esc(s.name)}</strong><small>${s.active ? t("team.on") : t("team.off")}</small></div>
            <button class="btn ghost" data-act="edit-staff" data-id="${s.id}">${t("client.edit")}</button>
          </div>`
        )
        .join("")}
    </div>`;
}

function pageOficina() {
  const s = db.settings;
  return `
    <div class="card">
      <label>${t("shop.name")}</label>
      <input id="setName" value="${esc(s.businessName)}" />
      <label>${t("shop.wa")}</label>
      <input id="setWhats" value="${esc(s.whatsapp || s.phone)}" placeholder="612 000 000" />
      <label>${t("shop.prefix")}</label>
      <input id="setPrefix" value="${esc(s.prefix)}" />
      <label>${t("shop.addr")}</label>
      <input id="setAddr" value="${esc(s.address)}" />
      <label>${t("shop.open")}</label>
      <input id="setOpen" type="time" value="${esc(s.openHour)}" />
      <label>${t("shop.close")}</label>
      <input id="setClose" type="time" value="${esc(s.closeHour)}" />
      <label>${t("shop.days")}</label>
      <input id="setDays" type="number" min="7" max="180" value="${esc(s.reminderDays)}" />
      <label>${t("shop.cur")}</label>
      <select id="setCur">
        <option value="EUR" ${s.currency === "EUR" ? "selected" : ""}>${t("euro")}</option>
        <option value="BRL" ${s.currency === "BRL" ? "selected" : ""}>${t("real")}</option>
      </select>
      <label>${t("shop.lang")}</label>
      <select id="setLang">
        <option value="es" ${s.lang === "es" ? "selected" : ""}>${t("shop.lang.es")}</option>
        <option value="pt" ${s.lang === "pt" ? "selected" : ""}>${t("shop.lang.pt")}</option>
        <option value="pt-BR" ${s.lang === "pt-BR" ? "selected" : ""}>${t("shop.lang.pt-BR")}</option>
      </select>
      <div class="actions"><button class="btn wide" data-act="save-settings">${t("shop.save")}</button></div>
    </div>`;
}

function pageJob(id) {
  const job = db.jobs.find((j) => j.id === id);
  if (!job) return `<p class="empty">${t("job.missing")}</p>`;
  const client = clientById(job.clientId);
  const vehicle = vehicleById(job.vehicleId);
  const names = (job.serviceIds || []).map((sid) => serviceById(sid)?.name).filter(Boolean);
  return `
    <div class="card">
      <div class="row"><h2>${fmtDate(job.date)} · ${esc(job.start)}–${esc(job.end || "")}</h2>
        <span class="chips">${chipStatus(job.status)}${chipPaid(job)}</span>
      </div>
      <p><strong>${esc(client?.name)}</strong><br><span class="muted">${esc(vehicleTitle(vehicle))} · ${esc(staffById(job.staffId)?.name || "")}</span></p>
      <p>${esc(names.join(", ") || t("price.svc"))}</p>
      <p class="total">${fmtMoney(jobTotal(job))}</p>
      ${job.paid ? `<p class="ok-box">${t("pay.done", { method: job.payMethod || t("pay.cash") })}</p>` : ""}
      ${job.notes ? `<p>${esc(job.notes)}</p>` : ""}
      ${job.readyNotifiedAt ? `<p class="muted">${t("job.readyDone")} · ${esc(job.readyNotifiedAt)}</p>` : ""}
      <div class="actions">
        ${job.status !== "curso" && job.status !== "feito" && job.status !== "cancelado" ? `<button class="btn" data-act="status" data-id="${job.id}" data-status="curso">${t("job.start")}</button>` : ""}
        ${job.status !== "feito" && job.status !== "cancelado" ? `<button class="btn" data-act="status" data-id="${job.id}" data-status="feito">${t("job.done")}</button>` : ""}
        ${!job.paid && job.status !== "cancelado" ? `<button class="btn gold" data-act="pay" data-id="${job.id}">${t("job.pay")}</button>` : ""}
        ${
          job.status === "feito" && client?.phone && !job.readyNotifiedAt
            ? `<a class="btn gold" data-act="ready-wa" data-id="${job.id}" target="_blank" rel="noopener" href="${waLink(client.phone, readyText(job))}">${t("job.ready")}</a>`
            : ""
        }
        ${job.status !== "cancelado" ? `<button class="btn ghost" data-act="edit-job" data-id="${job.id}">${t("job.reschedule")}</button>` : ""}
        ${
          client?.phone
            ? `<a class="btn ghost" target="_blank" rel="noopener" href="${waLink(
                client.phone,
                t("wa.book", { name: client.name, vehicle: vehicleTitle(vehicle), date: fmtDate(job.date), time: job.start, shop: db.settings.businessName })
              )}">${t("job.warn")}</a>`
            : ""
        }
        ${job.status !== "cancelado" && job.status !== "feito" ? `<button class="btn danger" data-act="status" data-id="${job.id}" data-status="cancelado">${t("job.cancel")}</button>` : ""}
      </div>
    </div>`;
}

function optionsClients(selected) {
  return db.clients
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "pt"))
    .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${esc(c.name)}</option>`)
    .join("");
}

function optionsVehicles(clientId, selected) {
  return vehiclesOf(clientId)
    .map((v) => `<option value="${v.id}" ${v.id === selected ? "selected" : ""}>${esc(vehicleTitle(v))}</option>`)
    .join("");
}

function ensureClient(name, phone) {
  const n = String(name || "").trim();
  if (!n) return null;
  const found = db.clients.find((c) => c.name.toLowerCase() === n.toLowerCase());
  if (found) {
    if (phone && !found.phone) found.phone = phone;
    else if (phone) found.phone = phone;
    return found;
  }
  const created = {
    id: uid(),
    name: n,
    phone: String(phone || "").trim(),
    email: "",
    notes: "",
    createdAt: today(),
  };
  db.clients.push(created);
  return created;
}

function ensureVehicle(clientId, plate, size) {
  const p = String(plate || "").trim().toUpperCase();
  if (p) {
    const hit = db.vehicles.find((v) => v.clientId === clientId && v.plate.toUpperCase() === p);
    if (hit) {
      if (size) hit.size = size;
      return hit;
    }
  } else {
    const first = vehiclesOf(clientId)[0];
    if (first) return first;
  }
  const created = {
    id: uid(),
    clientId,
    plate: p,
    brand: "",
    model: "",
    color: "",
    size: size || "berlina",
    notes: "",
  };
  db.vehicles.push(created);
  return created;
}

function fillFromName() {
  const name = $("fName")?.value.trim().toLowerCase();
  if (!name) return;
  const hit = db.clients.find((c) => c.name.toLowerCase() === name)
    || db.clients.find((c) => c.name.toLowerCase().includes(name));
  if (!hit) return;
  if ($("fPhone") && !$("fPhone").value) $("fPhone").value = hit.phone || "";
  const vs = vehiclesOf(hit.id);
  if (vs[0] && $("fPlate") && !$("fPlate").value) $("fPlate").value = vs[0].plate || "";
  if (vs[0] && $("fSize")) $("fSize").value = vs[0].size || "berlina";
  refreshJobServices();
}

function serviceChecks(vehicleId, selectedIds) {
  const size = $("fSize")?.value || vehicleById(vehicleId)?.size || "berlina";
  const selected = new Set(selectedIds || []);
  return db.services
    .filter((s) => s.active !== false)
    .map((s) => {
      const p = priceOf(s, size);
      return `<label class="check">
        <input type="checkbox" data-svc="${s.id}" ${selected.has(s.id) ? "checked" : ""} />
        <span class="grow">${esc(s.name)}<br><small>${s.durationMin} min · ${fmtMoney(p)}</small></span>
      </label>`;
    })
    .join("");
}

function jobForm(job, preset = {}) {
  const client = clientById(job?.clientId || preset.clientId);
  const vehicle = vehicleById(job?.vehicleId || preset.vehicleId) || (client ? vehiclesOf(client.id)[0] : null);
  const date = job?.date || preset.date || selectedDay || today();
  const start = job?.start || "10:00";
  const status = job?.status || "confirmado";
  const staffId = job?.staffId || db.staff.find((s) => s.active)?.id || "";
  const serviceIds = job?.serviceIds || [];
  const discount = job?.discount || 0;
  const size = vehicle?.size || "berlina";
  return `
    <div class="sheet">
      <h2>${job ? t("form.editjob") : t("form.newjob")}</h2>
      <label>${t("form.name")}</label>
      <input id="fName" list="fNames" value="${esc(client?.name || "")}" placeholder="${esc(t("form.nameHint"))}" autocomplete="off" />
      <datalist id="fNames">${db.clients.map((c) => `<option value="${esc(c.name)}"></option>`).join("")}</datalist>
      <label>${t("form.phone")}</label>
      <input id="fPhone" value="${esc(client?.phone || "")}" inputmode="tel" placeholder="612 000 000" />
      <label>${t("form.plate")}</label>
      <input id="fPlate" value="${esc(vehicle?.plate || "")}" placeholder="1234 ABC" />
      <label>${t("form.type")}</label>
      <select id="fSize">${SIZES.map(
        (s) => `<option value="${s.id}" ${s.id === size ? "selected" : ""}>${t("size." + s.id)}</option>`
      ).join("")}</select>
      <label>${t("form.day")}</label>
      <input id="fDate" type="date" value="${esc(date)}" />
      <label>${t("form.time")}</label>
      <input id="fStart" type="time" value="${esc(start)}" />
      <label>${t("form.duration")}</label>
      <input id="fDur" type="number" min="15" step="5" value="${esc(job?.durationMin || serviceIds.reduce((a, sid) => a + Number(serviceById(sid)?.durationMin || 0), 0) || 30)}" />
      <p id="fConflict" class="ok-box">${t("form.noconflict")}</p>
      <label>${t("form.who")}</label>
      <select id="fStaff">${db.staff
        .map((s) => `<option value="${s.id}" ${s.id === staffId ? "selected" : ""}>${esc(s.name)}</option>`)
        .join("")}</select>
      <label>${t("form.state")}</label>
      <select id="fStatus">${Object.keys(STATUS)
        .map((k) => `<option value="${k}" ${k === status ? "selected" : ""}>${t("st." + k)}</option>`)
        .join("")}</select>
      <div id="svcBox">${serviceChecks(vehicle?.id, serviceIds)}</div>
      <label>${t("form.disc")}</label>
      <input id="fDisc" type="number" min="0" step="0.5" value="${esc(discount)}" />
      <label>${t("form.notes")}</label>
      <textarea id="fNotes">${esc(job?.notes || "")}</textarea>
      <p class="total" id="fTotal">${fmtMoney(job ? jobTotal(job) : 0)}</p>
      <div class="actions">
        <button class="btn wide" data-act="save-job" data-id="${job?.id || ""}">${t("form.save")}</button>
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

function clientForm(client) {
  return `
    <div class="sheet">
      <h2>${client ? t("form.editc") : t("form.newc")}</h2>
      <label>${t("form.name")}</label><input id="cName" value="${esc(client?.name || "")}" />
      <label>${t("form.phone")}</label><input id="cPhone" value="${esc(client?.phone || "")}" inputmode="tel" />
      <label>${t("form.mail")}</label><input id="cEmail" value="${esc(client?.email || "")}" />
      <label>${t("form.notes")}</label><textarea id="cNotes">${esc(client?.notes || "")}</textarea>
      <div class="actions">
        <button class="btn wide" data-act="save-client" data-id="${client?.id || ""}">${t("form.save")}</button>
        ${client ? `<button class="btn danger wide" data-act="del-client" data-id="${client.id}">${t("form.delc")}</button>` : ""}
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

function vehicleForm(vehicle, clientId) {
  const cid = vehicle?.clientId || clientId;
  return `
    <div class="sheet">
      <h2>${vehicle ? t("form.editv") : t("form.newv")}</h2>
      <label>${t("form.plate")}</label><input id="vPlate" value="${esc(vehicle?.plate || "")}" />
      <label>${t("form.brand")}</label><input id="vBrand" value="${esc(vehicle?.brand || "")}" />
      <label>${t("form.model")}</label><input id="vModel" value="${esc(vehicle?.model || "")}" />
      <label>${t("form.color")}</label><input id="vColor" value="${esc(vehicle?.color || "")}" />
      <label>${t("form.type")}</label>
      <select id="vSize">${SIZES.map(
        (s) => `<option value="${s.id}" ${s.id === (vehicle?.size || "berlina") ? "selected" : ""}>${t("size." + s.id)}</option>`
      ).join("")}</select>
      <label>${t("form.notes")}</label><textarea id="vNotes">${esc(vehicle?.notes || "")}</textarea>
      <div class="actions">
        <button class="btn wide" data-act="save-vehicle" data-id="${vehicle?.id || ""}" data-client="${cid}">${t("form.save")}</button>
        ${vehicle ? `<button class="btn danger wide" data-act="del-vehicle" data-id="${vehicle.id}">${t("form.delv")}</button>` : ""}
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

function staffSheet(staff) {
  return `
    <div class="sheet">
      <h2>${staff ? t("client.edit") : t("team.add")}</h2>
      <label>${t("form.name")}</label>
      <input id="stName" value="${esc(staff?.name || "")}" />
      <div class="actions">
        <button class="btn wide" data-act="save-staff" data-id="${staff?.id || ""}">${t("form.save")}</button>
        <button class="btn ghost wide" data-act="close">${t("form.close")}</button>
      </div>
    </div>`;
}

function openModal(html) {
  modal.innerHTML = html;
  if (!modal.open) modal.showModal();
  bindLiveTotal();
}

function closeModal() {
  if (modal.open) modal.close();
  modal.innerHTML = "";
}

function selectedServiceIds() {
  return [...modal.querySelectorAll("[data-svc]:checked")].map((el) => el.getAttribute("data-svc"));
}

function liveTotal() {
  const totalEl = $("fTotal");
  if (!totalEl) return;
  const size = $("fSize")?.value || vehicleById($("fVehicle")?.value)?.size || "berlina";
  const sum = selectedServiceIds().reduce((a, id) => a + priceOf(serviceById(id), size), 0);
  const disc = Number($("fDisc")?.value || 0);
  totalEl.textContent = fmtMoney(Math.max(0, sum - disc));
}

function bindLiveTotal() {
  const jobId = modal.querySelector("[data-act='save-job']")?.dataset.id || "new";
  modal.querySelectorAll("[data-svc], #fDisc, #fSize, #fDate, #fStart, #fDur, #fStaff").forEach((el) => {
    el.addEventListener("change", () => {
      if (el.hasAttribute("data-svc")) syncDurationFromServices();
      if (el.id === "fSize") refreshJobServices();
      liveTotal();
      showConflict(jobId);
    });
  });
  $("fName")?.addEventListener("change", fillFromName);
  showConflict(jobId);
}

function refreshJobServices() {
  const box = $("svcBox");
  if (!box) return;
  const keep = selectedServiceIds();
  box.innerHTML = serviceChecks($("fVehicle")?.value, keep);
  bindLiveTotal();
  liveTotal();
}

function addMinutes(time, minutes) {
  const [h, m] = String(time || "10:00").split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m + Number(minutes || 30));
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function collectJob(id) {
  const serviceIds = selectedServiceIds();
  const duration = selectedDuration();
  const start = $("fStart").value;
  const prev = id ? db.jobs.find((j) => j.id === id) : null;
  return {
    id: id || uid(),
    staffId: $("fStaff").value,
    date: $("fDate").value,
    start,
    durationMin: duration,
    end: addMinutes(start, duration),
    serviceIds,
    status: $("fStatus").value,
    discount: Number($("fDisc").value || 0),
    paid: prev?.paid || false,
    payMethod: prev?.payMethod || t("pay.pend"),
    notes: $("fNotes").value.trim(),
  };
}

function titles() {
  return {
    hoje: t("title.hoje"),
    agenda: t("title.agenda"),
    clientes: t("title.clientes"),
    lembretes: t("title.lembretes"),
    mais: t("title.mais"),
    precos: t("title.precos"),
    caixa: t("title.caixa"),
    equipa: t("title.equipa"),
    oficina: t("title.oficina"),
    cliente: t("title.cliente"),
    job: t("title.job"),
  };
}

function render() {
  db = load();
  $("brandName").textContent = db.settings.businessName || t("welcome.h");
  const { page, id } = hashParts();
  document.documentElement.lang = lang() === "es" ? "es" : "pt";
  document.querySelectorAll(".tabs a").forEach((a) => {
    a.classList.toggle("active", a.dataset.tab === page);
    a.textContent = t("tab." + a.dataset.tab);
  });
  const map = titles();
  $("pageTitle").textContent = map[page] || t("welcome.h");
  $("btnAdd").style.display = db.settings.welcome ? "none" : "inline-flex";
  $("btnAdd").textContent = t("fab");

  if (db.settings.welcome) {
    view.innerHTML = pageWelcome();
    return;
  }
  if (page === "hoje") view.innerHTML = pageHoje();
  else if (page === "agenda") view.innerHTML = pageAgenda();
  else if (page === "clientes") view.innerHTML = pageClientes();
  else if (page === "cliente") view.innerHTML = pageCliente(id);
  else if (page === "lembretes") view.innerHTML = pageLembretes();
  else if (page === "precos") view.innerHTML = pagePreços();
  else if (page === "caixa") view.innerHTML = pageCaixa();
  else if (page === "mais") view.innerHTML = pageMais();
  else if (page === "equipa") view.innerHTML = pageEquipa();
  else if (page === "oficina") view.innerHTML = pageOficina();
  else if (page === "job") view.innerHTML = pageJob(id);
  else view.innerHTML = pageHoje();

  const q = $("qClient");
  if (q) {
    q.addEventListener("input", () => {
      clientQuery = q.value;
      render();
      const again = $("qClient");
      if (again) {
        again.focus();
        again.setSelectionRange(clientQuery.length, clientQuery.length);
      }
    });
  }
  const mes = $("caixaMes");
  if (mes) {
    mes.addEventListener("change", () => {
      selectedDay = mes.value + "-01";
      render();
    });
  }
  const ano = $("caixaAno");
  if (ano) {
    ano.addEventListener("change", () => {
      const year = String(ano.value || selectedDay.slice(0, 4)).padStart(4, "0");
      selectedDay = year + selectedDay.slice(4);
      render();
    });
  }
  document.querySelectorAll("[data-price]").forEach((input) => {
    input.addEventListener("change", () => {
      const svc = serviceById(input.dataset.price);
      if (!svc) return;
      svc.prices[input.dataset.size] = Number(input.value || 0);
      save();
    });
  });
  document.querySelectorAll("[data-price-name]").forEach((input) => {
    input.addEventListener("change", () => {
      const svc = serviceById(input.dataset.priceName);
      if (!svc) return;
      svc.name = input.value.trim() || svc.name;
      save();
    });
  });
}

function backupExport() {
  backupDownload();
}

function backupImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    if (!confirm(t("bak.confirm"))) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || !Array.isArray(data.clients)) throw new Error("archivo no válido");
      db = { ...emptyDb(), ...data, settings: { ...emptyDb().settings, ...(data.settings || {}), welcome: false } };
      db.settings.lastBackupAt = new Date().toISOString();
      save();
      closeModal();
      render();
    } catch (err) {
      alert(t("alert.bak") + err.message);
    }
  };
  input.click();
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-act]");
  if (!btn) return;
  const act = btn.dataset.act;
  const id = btn.dataset.id;

  if (act === "start-empty") startEmpty();
  if (act === "clear-demo") clearDemo();
  if (act === "seed") {
    seedExample();
    go("hoje");
    render();
  }
  if (act === "nova") {
    openModal(jobForm(null, { date: btn.dataset.date || selectedDay, clientId: btn.dataset.client, vehicleId: btn.dataset.vehicle }));
    liveTotal();
  }
  if (act === "open-job") go("job/" + id);
  if (act === "open-client") go("cliente/" + id);
  if (act === "go") go(btn.dataset.hash);
  if (act === "install-app" || act === "install-native") startInstall();
  if (act === "install-how") openModal(installSheet());
  if (act === "install-later") {
    hideInstallBanner();
    render();
  }
  if (act === "cash-view") {
    cashView = btn.dataset.view || "mes";
    render();
  }
  if (act === "print-cash") window.print();
  if (act === "month") {
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + Number(btn.dataset.dir), 1);
    render();
  }
  if (act === "day") {
    selectedDay = btn.dataset.date;
    render();
  }
  if (act === "new-client") openModal(clientForm(null));
  if (act === "edit-client") openModal(clientForm(clientById(id)));
  if (act === "save-client") {
    const name = $("cName").value.trim();
    if (!name) return alert(t("alert.name"));
    if (id) {
      const c = clientById(id);
      Object.assign(c, { name, phone: $("cPhone").value.trim(), email: $("cEmail").value.trim(), notes: $("cNotes").value.trim() });
    } else {
      db.clients.push({
        id: uid(),
        name,
        phone: $("cPhone").value.trim(),
        email: $("cEmail").value.trim(),
        notes: $("cNotes").value.trim(),
        createdAt: today(),
      });
    }
    save();
    closeModal();
    render();
  }
  if (act === "del-client") {
    if (!confirm(t("alert.delc"))) return;
    db.vehicles = db.vehicles.filter((v) => v.clientId !== id);
    db.clients = db.clients.filter((c) => c.id !== id);
    save();
    closeModal();
    go("clientes");
    render();
  }
  if (act === "new-vehicle") openModal(vehicleForm(null, btn.dataset.client || $("fClient")?.value));
  if (act === "edit-vehicle") openModal(vehicleForm(vehicleById(id)));
  if (act === "save-vehicle") {
    const plate = $("vPlate").value.trim().toUpperCase();
    const payload = {
      clientId: btn.dataset.client,
      plate,
      brand: $("vBrand").value.trim(),
      model: $("vModel").value.trim(),
      color: $("vColor").value.trim(),
      size: $("vSize").value,
      notes: $("vNotes").value.trim(),
    };
    if (id) Object.assign(vehicleById(id), payload);
    else db.vehicles.push({ id: uid(), ...payload });
    save();
    closeModal();
    render();
  }
  if (act === "del-vehicle") {
    if (!confirm(t("alert.delv"))) return;
    db.vehicles = db.vehicles.filter((v) => v.id !== id);
    save();
    closeModal();
    render();
  }
  if (act === "save-job") {
    const name = $("fName")?.value.trim();
    if (!name) return alert(t("alert.name"));
    const job = collectJob(id);
    if (!job.serviceIds.length) return alert(t("alert.nosvc"));
    const client = ensureClient(name, $("fPhone")?.value.trim());
    const vehicle = ensureVehicle(client.id, $("fPlate")?.value, $("fSize")?.value);
    job.clientId = client.id;
    job.vehicleId = vehicle.id;
    if (conflict(job) && !confirm(t("alert.conflict"))) return;
    const i = db.jobs.findIndex((j) => j.id === job.id);
    if (i >= 0) db.jobs[i] = { ...db.jobs[i], ...job };
    else db.jobs.push(job);
    save();
    closeModal();
    go("job/" + job.id);
    render();
  }
  if (act === "edit-job") openModal(jobForm(db.jobs.find((j) => j.id === id)));
  if (act === "status") {
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return;
    job.status = btn.dataset.status;
    if (job.status === "feito") {
      const v = vehicleById(job.vehicleId);
      if (v) v.lastServiceAt = job.date;
      job.readyAt = new Date().toISOString();
    }
    save();
    render();
  }
  if (act === "ready-wa") {
    const job = db.jobs.find((j) => j.id === id);
    if (job) {
      job.readyNotifiedAt = new Date().toLocaleString(loc());
      save();
    }
  }
  if (act === "pay") {
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return;
    openModal(paySheet(job));
  }
  if (act === "pay-ok") {
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return;
    job.paid = true;
    job.payMethod = btn.dataset.method || t("pay.cash");
    save();
    closeModal();
    render();
  }
  if (act === "close") closeModal();
  if (act === "new-service") {
    db.services.push({
      id: uid(),
      name: t("svc.new"),
      category: "extra",
      durationMin: 30,
      active: true,
      prices: { citadino: 0, berlina: 0, suv: 0, van: 0, moto: 0 },
    });
    save();
    render();
  }
  if (act === "del-service") {
    db.services = db.services.filter((s) => s.id !== id);
    save();
    render();
  }
  if (act === "new-staff") openModal(staffSheet(null));
  if (act === "edit-staff") openModal(staffSheet(staffById(id)));
  if (act === "save-staff") {
    const name = $("stName")?.value.trim();
    if (!name) return alert(t("alert.name"));
    if (id) {
      const s = staffById(id);
      if (s) s.name = name;
    } else {
      db.staff.push({ id: uid(), name, active: true });
    }
    save();
    closeModal();
    render();
  }
  if (act === "prices-ok") {
    db.settings.pricesOk = true;
    save();
    go("hoje");
    render();
  }
  if (act === "save-settings") {
    db.settings.businessName = $("setName").value.trim() || t("welcome.h");
    db.settings.whatsapp = $("setWhats").value.trim();
    db.settings.phone = db.settings.whatsapp;
    db.settings.prefix = $("setPrefix").value.trim() || "34";
    db.settings.address = $("setAddr").value.trim();
    db.settings.openHour = $("setOpen").value;
    db.settings.closeHour = $("setClose").value;
    db.settings.reminderDays = Number($("setDays").value || 30);
    db.settings.currency = $("setCur").value;
    db.settings.lang = $("setLang")?.value || "es";
    save();
    go("hoje");
    render();
  }
  if (act === "backup") {
    openModal(backupSheet());
  }
  if (act === "backup-share") backupShare();
  if (act === "backup-later") {
    db.settings.bakSnooze = today();
    save();
    render();
  }
  if (act === "export") backupExport();
  if (act === "import") backupImport();
});

$("btnAdd").addEventListener("click", () => {
  if (db.settings.welcome) return;
  openModal(jobForm(null, { date: selectedDay }));
  liveTotal();
});

document.addEventListener("change", (event) => {
  if (event.target.id === "fName") fillFromName();
});

window.addEventListener("hashchange", render);
render();

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstall = event;
});
window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  hideInstallBanner();
});

if (location.protocol.startsWith("http") && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
